'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import * as CANNON from 'cannon-es';

const AnimatedName = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Physics world setup
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0); // Set gravity

    const cubes: { mesh: THREE.Mesh; body: CANNON.Body }[] = [];

    const fontLoader = new FontLoader();
    fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      const textLine1 = "Hi, I'm Mithilesh Patel";
      const textLine2 = 'MERN Stack Developer';

      const textGeometry1 = new TextGeometry(textLine1, {
        font: font,
        size: 0.8,
        depth: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      textGeometry1.center();

      const textGeometry2 = new TextGeometry(textLine2, {
        font: font,
        size: 0.5,
        depth: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      textGeometry2.center();

      const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const textMesh1 = new THREE.Mesh(textGeometry1, textMaterial);
      const textMesh2 = new THREE.Mesh(textGeometry2, textMaterial);

      const textGroup = new THREE.Group();
      textMesh1.position.y = 0.5;
      textGroup.add(textMesh1);
      textGroup.add(textMesh2);
      scene.add(textGroup);

      const boxSize = 0.1;
      const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);

      const combinedVertices = new Float32Array([
        ...textGeometry1.attributes.position.array,
        ...textGeometry2.attributes.position.array,
      ]);

      const vertices = combinedVertices;
      const shape = new CANNON.Box(new CANNON.Vec3(boxSize / 2, boxSize / 2, boxSize / 2));

      for (let i = 0; i < vertices.length; i += 3) {
        const cubeMaterial = new THREE.MeshBasicMaterial({
          color: Math.random() * 0xffffff,
          transparent: true,
          opacity: 1
        });
        const cubeMesh = new THREE.Mesh(boxGeometry, cubeMaterial);
        cubeMesh.position.set(vertices[i], vertices[i + 1], vertices[i + 2]);

        const cubeBody = new CANNON.Body({
          mass: 0.1,
          position: new CANNON.Vec3(vertices[i], vertices[i + 1], vertices[i + 2]),
          shape: shape,
        });
        cubes.push({ mesh: cubeMesh, body: cubeBody });
      }

      const onMouseEnter = () => {
        scene.remove(textGroup);
        cubes.forEach(cube => {
          scene.add(cube.mesh);
          world.addBody(cube.body);
          // Apply a random impulse to scatter the cubes
          const force = new CANNON.Vec3(
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5
          );
          cube.body.applyImpulse(force, cube.body.position);
        });
      };

      mount?.addEventListener('mouseenter', onMouseEnter);
    });

    const clock = new THREE.Clock();
    let oldElapsedTime = 0;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - oldElapsedTime;
      oldElapsedTime = elapsedTime;

      world.step(1 / 60, deltaTime, 3);

      cubes.forEach(cube => {
        cube.mesh.position.copy(cube.body.position as unknown as THREE.Vector3);
        cube.mesh.quaternion.copy(cube.body.quaternion as unknown as THREE.Quaternion);

        // Fade out cubes that are falling
        if (cube.body.position.y < 0) {
          (cube.mesh.material as THREE.MeshBasicMaterial).opacity -= 0.01;
        }
      });

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '300px' }} />;
};

export default AnimatedName;
