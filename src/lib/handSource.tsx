// One authored silhouette supplies both the particle hero and the honest
// static fallback until a redistributable CC0 hand GLB is available.
export const HAND_OUTLINE_PATH = 'M206 649 L219 523 Q224 480 249 454 L245 311 Q244 278 270 275 Q297 274 300 308 L306 422 L313 146 Q314 110 344 110 Q375 110 375 148 L370 418 L385 91 Q387 55 416 58 Q446 60 444 98 L427 429 L449 166 Q452 132 481 137 Q510 142 504 178 L479 435 Q513 394 540 411 Q568 429 548 462 L494 544 Q466 588 419 604 L407 649 Z M251 454 Q211 444 181 411 Q157 386 132 355 Q111 328 133 308 Q155 288 180 312 L245 372 M220 523 Q315 548 407 523';

let gltfPromise: Promise<import('three').Group | null> | undefined;

export function loadHandModel(): Promise<import('three').Group | null> {
  if (!gltfPromise) {
    const modelUrl = `${import.meta.env.BASE_URL}models/hand.glb`;
    gltfPromise = fetch(modelUrl, { method: 'HEAD' }).then(async (response) => {
      if (!response.ok) return null;
      const [{ GLTFLoader }, { clone }] = await Promise.all([
        import('three/addons/loaders/GLTFLoader.js'),
        import('three/addons/utils/SkeletonUtils.js'),
      ]);
      const gltf = await new GLTFLoader().loadAsync(modelUrl);
      return clone(gltf.scene) as import('three').Group;
    }).catch(() => null);
  }
  return gltfPromise!;
}

export function HandIllustration({ className = '' }: { className?: string }) {
  return (
    <svg className={`hand-illustration ${className}`} viewBox="0 0 640 700" role="img" aria-label="Illustrated hand silhouette">
      <defs>
        <linearGradient id="hand-ink" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fff3f5" />
          <stop offset=".48" stopColor="#f68da6" />
          <stop offset="1" stopColor="#a52c54" />
        </linearGradient>
        <filter id="hand-glow" x="-60%" y="-35%" width="220%" height="190%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>
      <ellipse cx="345" cy="655" rx="190" ry="32" fill="#f25c86" opacity=".42" filter="url(#hand-glow)" />
      <path d={HAND_OUTLINE_PATH} fill="url(#hand-ink)" fillRule="evenodd" stroke="#ffd5df" strokeWidth="2" strokeLinejoin="round" />
      <path d="M270 440 L271 317 M340 420 L344 153 M414 421 L422 101 M475 431 L486 183 M245 485 Q320 513 408 489" fill="none" stroke="#fff5f6" strokeWidth="2" strokeLinecap="round" opacity=".58" />
      <path d="M185 312 Q157 290 136 313 M541 415 Q565 436 546 461" fill="none" stroke="#ffb5c6" strokeWidth="3" strokeLinecap="round" opacity=".78" />
    </svg>
  );
}

export async function getHandSamplePoints(): Promise<Array<[number, number]>> {
  const model = await loadHandModel();
  if (model) {
    const THREE = await import('three');
    const vertices: Array<[number, number]> = [];
    model.updateMatrixWorld(true);
    model.traverse((node) => {
      if (!(node instanceof THREE.Mesh)) return;
      const position = node.geometry.getAttribute('position');
      if (!position) return;
      const stride = Math.max(1, Math.floor(position.count / 1000));
      for (let i = 0; i < position.count; i += stride) {
        const point = new THREE.Vector3().fromBufferAttribute(position, i).applyMatrix4(node.matrixWorld);
        vertices.push([point.x, point.y]);
      }
    });
    if (vertices.length) {
      const xs = vertices.map(([x]) => x); const ys = vertices.map(([, y]) => y);
      const minX = Math.min(...xs); const maxX = Math.max(...xs); const minY = Math.min(...ys); const maxY = Math.max(...ys);
      const width = Math.max(maxX - minX, .001); const height = Math.max(maxY - minY, .001);
      return vertices.map(([x, y]) => [90 + (x - minX) / width * 420, 40 + (maxY - y) / height * 600]);
    }
  }

  const source = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  source.setAttribute('viewBox', '0 0 640 700');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', HAND_OUTLINE_PATH);
  path.setAttribute('fill-rule', 'evenodd');
  source.appendChild(path);
  const length = path.getTotalLength();
  const points: Array<[number, number]> = [];
  for (let i = 0; i < 820; i += 1) {
    const point = path.getPointAtLength((i / 820) * length);
    points.push([point.x, point.y]);
  }
  return points;
}
