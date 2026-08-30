/**
 * SoftwareThreeScene.tsx
 *
 * Isometric dark room with paneled walls, chair rail, crown molding,
 * three-point lighting, and mouse-parallax tilt.
 */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Raised panel frame on the back wall (strips protrude toward +Z). */
function addBackPanel(
  root: THREE.Group, mat: THREE.Material,
  cx: number, cy: number, w: number, h: number,
  t = 0.05, p = 0.035,
) {
  const z = -3.96;
  const defs: [number, number, number, number, number][] = [
    [w,           t, p, 0,               h / 2 - t / 2],
    [w,           t, p, 0,             -(h / 2 - t / 2)],
    [t, h - t * 2, p, -(w / 2 - t / 2), 0             ],
    [t, h - t * 2, p,   w / 2 - t / 2,  0             ],
  ];
  defs.forEach(([bw, bh, bd, ox, oy]) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), mat);
    m.position.set(cx + ox, cy + oy, z);
    root.add(m);
  });
}

/** Raised panel frame on the left wall (strips protrude toward +X). */
function addLeftPanel(
  root: THREE.Group, mat: THREE.Material,
  cz: number, cy: number, w: number, h: number,
  t = 0.05, p = 0.035,
) {
  const x = -3.96;
  const defs: [number, number, number, number, number, number][] = [
    [p,           t, w, 0, h / 2 - t / 2,  0             ],
    [p,           t, w, 0, -(h / 2 - t / 2), 0           ],
    [p, h - t * 2, t, 0, 0,               -(w / 2 - t / 2)],
    [p, h - t * 2, t, 0, 0,                 w / 2 - t / 2],
  ];
  defs.forEach(([bw, bh, bd, ox, oy, oz]) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), mat);
    m.position.set(x + ox, cy + oy, cz + oz);
    root.add(m);
  });
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  /** When false: auto-rotates passively, no drag controls, pointer-events none. */
  interactive?: boolean;
}

const SoftwareThreeScene: React.FC<Props> = ({ interactive = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x0d0f14, 1);
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────────────────────
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60, mount.clientWidth / mount.clientHeight, 0.1, 50,
    );
    camera.position.set(7.5, 6.0, 7.5);
    camera.lookAt(0, 1, 0);

    const root = new THREE.Group();
    scene.add(root);

    // ── Materials ─────────────────────────────────────────────────────
    const mkStd = (color: number, roughness = 0.85, opts = {}) =>
      new THREE.MeshStandardMaterial({ color, roughness, side: THREE.FrontSide, ...opts });

    const wallMat  = mkStd(0x1e2a40);               // medium-dark navy
    const floorMat = mkStd(0x131820, 0.9, { metalness: 0.1 });
    const trimMat  = mkStd(0x2e3f5c);               // noticeably lighter trim
    const frameMat = mkStd(0x253550);               // panel frame

    // ── Floor ─────────────────────────────────────────────────────────
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), floorMat);
    floor.rotation.x = -Math.PI / 2;
    root.add(floor);

    // Floor plank seams
    for (let z = -3.75; z <= 3.75; z += 0.5) {
      const seam = new THREE.Mesh(
        new THREE.BoxGeometry(8, 0.004, 0.014),
        mkStd(0x0a0d12, 1),
      );
      seam.position.set(0, 0.002, z);
      root.add(seam);
    }

    // ── Back wall ─────────────────────────────────────────────────────
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(8, 5), wallMat);
    backWall.position.set(0, 2.5, -4);
    root.add(backWall);

    // ── Left wall ─────────────────────────────────────────────────────
    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(8, 5), wallMat.clone());
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-4, 2.5, 0);
    root.add(leftWall);

    // ── Trim helper ───────────────────────────────────────────────────
    const box = (w: number, h: number, d: number, x: number, y: number, z: number) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), trimMat);
      m.position.set(x, y, z);
      root.add(m);
    };

    // Baseboards
    box(8.02, 0.14, 0.07,  0,     0.07, -3.96);
    box(0.07, 0.14, 8.02, -3.96,  0.07,  0);

    // Chair rail at y = 1.5
    box(8.02, 0.08, 0.08,  0,     1.5,  -3.955);
    box(0.08, 0.08, 8.02, -3.955, 1.5,   0);

    // Crown molding at y = 4.84
    box(8.02, 0.12, 0.10,  0,     4.84, -3.95);
    box(0.10, 0.12, 8.02, -3.95,  4.84,  0);

    // Corner column
    box(0.07, 5, 0.07, -3.965, 2.5, -3.965);

    // ── Wall panels ───────────────────────────────────────────────────
    const PW   = 2.2;
    const UP_Y = 3.2;  const UP_H = 2.9;
    const LO_Y = 0.76; const LO_H = 1.08;

    [-2.6, 0.0, 2.6].forEach(pos => {
      addBackPanel(root, frameMat, pos, UP_Y, PW, UP_H);
      addBackPanel(root, frameMat, pos, LO_Y, PW, LO_H);
      addLeftPanel(root, frameMat, pos, UP_Y, PW, UP_H);
      addLeftPanel(root, frameMat, pos, LO_Y, PW, LO_H);
    });

    // ── Lighting ──────────────────────────────────────────────────────
    // Ambient — cool blue fill so dark faces aren't pitch black
    scene.add(new THREE.AmbientLight(0x3a5080, 1.2));

    // Main overhead — bright warm-white centred on the room corner
    const overhead = new THREE.PointLight(0xd0e0f0, 3.5, 16, 1.0);
    overhead.position.set(-0.5, 4.6, -0.5);
    scene.add(overhead);

    // Teal accent from camera side — like monitor/LED glow
    const teal = new THREE.PointLight(0x64d4e8, 1.2, 10, 1.5);
    teal.position.set(3.5, 2, 3.5);
    scene.add(teal);

    // Warm fill in far corner
    const warm = new THREE.PointLight(0xffc87a, 0.8, 8, 1.8);
    warm.position.set(-3, 3.5, -3);
    scene.add(warm);

    // ── Controls (interactive mode only) ─────────────────────────────
    const rotTarget  = { x: 0, y: 0 };
    const rotCurrent = { x: 0, y: 0 };
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    const SPEED = 0.007;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      mount.style.cursor = 'grabbing';
      mount.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      rotTarget.y += (e.clientX - lastX) * SPEED;
      rotTarget.x += (e.clientY - lastY) * SPEED;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onPointerUp = () => {
      isDragging = false;
      mount.style.cursor = 'grab';
    };

    if (interactive) {
      mount.style.cursor = 'grab';
      mount.addEventListener('pointerdown',  onPointerDown);
      mount.addEventListener('pointermove',  onPointerMove);
      mount.addEventListener('pointerup',    onPointerUp);
      mount.addEventListener('pointerleave', onPointerUp);
    } else {
      mount.style.pointerEvents = 'none';
    }

    // ── ResizeObserver ────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    });
    ro.observe(mount);

    // ── Render loop ───────────────────────────────────────────────────
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (interactive) {
        rotCurrent.x += (rotTarget.x - rotCurrent.x) * 0.08;
        rotCurrent.y += (rotTarget.y - rotCurrent.y) * 0.08;
        root.rotation.x = rotCurrent.x;
        root.rotation.y = rotCurrent.y;
      }
      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      if (interactive) {
        mount.removeEventListener('pointerdown',  onPointerDown);
        mount.removeEventListener('pointermove',  onPointerMove);
        mount.removeEventListener('pointerup',    onPointerUp);
        mount.removeEventListener('pointerleave', onPointerUp);
      }
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="sw-three-scene" />;
};

export default SoftwareThreeScene;
