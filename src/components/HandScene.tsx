import React, { useEffect, useRef } from 'react';
import { HandIllustration, loadHandModel } from '../lib/handSource';

interface HandSceneProps { pose?: number; className?: string }

const poseFor = (root: import('three').Object3D, index: number) => {
  const preset = index % 9;
  root.rotation.set(.08 + preset * .025, -.18 + preset * .06, -.08 + preset * .02);
  const digitPattern = [0, 1, 1, 2, 2, 3, 3, 4, 4][preset];
  root.traverse((node) => {
    const name = node.name.toLowerCase();
    if (!/(thumb|index|middle|ring|pinky|little|finger|digit)/.test(name)) return;
    const finger = name.includes('thumb') ? 0 : name.includes('index') ? 1 : name.includes('middle') ? 2 : name.includes('ring') ? 3 : 4;
    node.rotation.x += finger === digitPattern ? -.18 : .04;
  });
};

export const HandScene: React.FC<HandSceneProps> = ({ pose = 0, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const groupRef = useRef<import('three').Group | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const staticOnly = reduced || window.matchMedia('(max-width: 700px), (pointer: coarse)').matches;
    if (!canvas || staticOnly) return;
    let dispose: () => void = () => {};
    let live = true;
    let intersectionObserver: IntersectionObserver | undefined;
    const init = async () => {
      const model = await loadHandModel();
      if (!model || !live || !canvas.parentElement) return;
      const [THREE, { RoomEnvironment }, { clone }] = await Promise.all([
        import('three'),
        import('three/addons/environments/RoomEnvironment.js'),
        import('three/addons/utils/SkeletonUtils.js'),
      ]);
      if (!live) return;
      const parent = canvas.parentElement;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, .01, 100);
      camera.position.set(0, .15, 5.8);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture;
      scene.add(new THREE.HemisphereLight(0xffd9e1, 0x27212a, 1.3));
      const key = new THREE.DirectionalLight(0xffb6c8, 3.4);
      key.position.set(-3, 4, 5);
      scene.add(key);
      const rim = new THREE.PointLight(0xf36391, 8, 10);
      rim.position.set(2, -1.5, 2);
      scene.add(rim);
      const hand = clone(model);
      hand.traverse((node) => {
        if (node instanceof THREE.Mesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          node.material = new THREE.MeshPhysicalMaterial({
            color: '#e9e4e8', metalness: .92, roughness: .13, clearcoat: 1, clearcoatRoughness: .09,
            envMapIntensity: 1.65,
          });
        }
      });
      const bounds = new THREE.Box3().setFromObject(hand);
      const size = bounds.getSize(new THREE.Vector3());
      const center = bounds.getCenter(new THREE.Vector3());
      hand.position.sub(center);
      hand.scale.setScalar(2.65 / Math.max(size.x, size.y, size.z, .001));
      const holder = new THREE.Group();
      holder.add(hand);
      poseFor(holder, pose);
      groupRef.current = holder;
      scene.add(holder);
      const resize = () => {
        const rect = parent.getBoundingClientRect();
        const width = Math.max(1, rect.width); const height = Math.max(1, rect.height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(parent);
      resize();
      let visible = false;
      intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
      intersectionObserver.observe(parent);
      const clock = new THREE.Clock();
      renderer.setAnimationLoop(() => {
        if (!visible || !live) return;
        const time = clock.getElapsedTime();
        holder.rotation.y += (Math.sin(time * .42) * .055 - (holder.rotation.y - (pose % 5) * .05)) * .03;
        renderer.render(scene, camera);
      });
      dispose = () => {
        renderer.setAnimationLoop(null);
        resizeObserver.disconnect();
        intersectionObserver?.disconnect();
        scene.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            node.geometry.dispose();
            const materials = Array.isArray(node.material) ? node.material : [node.material];
            materials.forEach((material) => material.dispose());
          }
        });
        scene.environment?.dispose();
        pmrem.dispose();
        renderer.dispose();
        groupRef.current = null;
        delete parent.dataset.modelLoaded;
      };
      canvas.dataset.ready = 'true';
      parent.dataset.modelLoaded = 'true';
    };
    void init();
    return () => { live = false; dispose(); intersectionObserver?.disconnect(); };
  }, []);

  useEffect(() => {
    if (groupRef.current) poseFor(groupRef.current, pose);
  }, [pose]);

  return (
    <div className={`hand-scene ${className}`} role="img" aria-label="Metallic hand study; the WebGL model uses public/models/hand.glb when supplied">
      <HandIllustration className="hand-scene-fallback" />
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="hand-scene-note">3D HAND MODEL · CC0 ASSET REQUIRED</span>
    </div>
  );
};
