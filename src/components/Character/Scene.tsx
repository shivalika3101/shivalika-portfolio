import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import setCharacter, { BONES } from "./utils/character";
import setLighting from "./utils/lighting";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import Loading from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef(new THREE.Scene());
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = canvasDiv.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scene = sceneRef.current;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      14.5,
      rect.width / rect.height,
      0.1,
      1000
    );
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let headBone: THREE.Object3D | null = null;
    let chestBone: THREE.Object3D | null = null;
    let headRest = new THREE.Euler();
    let chestRestX = 0;
    let character: THREE.Object3D | null = null;

    const clock = new THREE.Clock();
    const light = setLighting(scene);

    const onProgress = (progress: number) => {
      setLoadingProgress(Math.round(progress));
      // Keep the loading screen just long enough for its exit animation (about 2.5s).
      if (progress >= 100) setTimeout(() => setIsLoading(false), 2600);
    };

    const onResize = () => {
      if (character) handleResize(renderer, camera, canvasDiv, character);
    };

    setCharacter(renderer, scene, camera, onProgress)
      .loadCharacter()
      .then((gltf) => {
        character = gltf.scene;
        scene.add(character);
        headBone = character.getObjectByName(BONES.head) || null;
        chestBone = character.getObjectByName(BONES.chest) || null;
        if (headBone) headRest = headBone.rotation.clone();
        if (chestBone) chestRestX = chestBone.rotation.x;

        setTimeout(() => {
          light.turnOnLights();
          gsap.from(character!.position, {
            y: character!.position.y - 1.2,
            duration: 1.6,
            ease: "power3.out",
          });
        }, 1500);

        window.addEventListener("resize", onResize);
      })
      .catch(() => setIsLoading(false));

    let mouse = { x: 0, y: 0 },
      interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };
    const onTouchMove = (e: TouchEvent) =>
      handleTouchMove(e, (x, y) => (mouse = { x, y }));
    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    const landingDiv = document.getElementById("landingDiv");
    landingDiv?.addEventListener("touchmove", onTouchMove, { passive: true });
    landingDiv?.addEventListener("touchend", onTouchEnd);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      if (headBone) {
        handleHeadRotation(
          headBone,
          headRest,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
      }
      // Gentle breathing so she doesn't look frozen.
      if (chestBone) {
        chestBone.rotation.x = chestRestX + Math.sin(time * 1.6) * 0.012;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      scene.clear();
      renderer.dispose();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMouseMove);
      landingDiv?.removeEventListener("touchmove", onTouchMove);
      landingDiv?.removeEventListener("touchend", onTouchEnd);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      {isLoading && <Loading percent={loadingProgress} />}
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
