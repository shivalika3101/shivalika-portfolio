import * as THREE from "three";
import { GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

// "Business Girl" by aki74 (https://sketchfab.com/aki74), CC-BY-4.0.
const MODEL_URL = "/models/business_girl.glb";

// Height of the model in scene units, and where her feet sit.
// The camera looks at y = 13.1, so this frames her from the head down to the waist.
const TARGET_HEIGHT = 11.5;
const FEET_Y = 3.4;

export const BONES = {
  head: "Head_3",
  neck: "Neck_4",
  chest: "Spine2_53",
};

// Bring the arms down from the model's A-pose into a relaxed standing pose.
const poseCharacter = (character: THREE.Object3D) => {
  const leftArm = character.getObjectByName("LeftArm_27");
  const rightArm = character.getObjectByName("RightArm_51");
  const leftForeArm = character.getObjectByName("LeftForeArm_26");
  const rightForeArm = character.getObjectByName("RightForeArm_50");
  if (leftArm) leftArm.rotation.x += 0.7;
  if (rightArm) rightArm.rotation.x += 0.7;
  if (leftForeArm) leftForeArm.rotation.z += 0.15;
  if (rightForeArm) rightForeArm.rotation.z -= 0.15;
};

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  onProgress?: (progress: number) => void
) => {
  const loader = new GLTFLoader();

  const loadCharacter = () =>
    new Promise<GLTF>((resolve, reject) => {
      onProgress?.(0);
      loader.load(
        MODEL_URL,
        async (gltf) => {
          const character = gltf.scene;

          const box = new THREE.Box3().setFromObject(character);
          const scale = TARGET_HEIGHT / (box.max.y - box.min.y);
          character.scale.setScalar(scale);
          character.position.y = FEET_Y - box.min.y * scale;

          poseCharacter(character);

          character.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          onProgress?.(90);
          // Pre-compiling shaders avoids a stutter, but some browsers never finish it.
          await Promise.race([
            renderer.compileAsync(character, camera, scene),
            new Promise((done) => setTimeout(done, 3000)),
          ]);
          onProgress?.(100);

          resolve(gltf);
          setCharTimeline(character, camera);
          setAllTimeline();
        },
        (xhr) => {
          const total = xhr.lengthComputable ? xhr.total : 1_800_000;
          onProgress?.(Math.min(85, Math.floor((xhr.loaded / total) * 85)));
        },
        (error) => {
          console.error("Error loading character model:", error);
          reject(error);
        }
      );
    });

  return { loadCharacter };
};

export default setCharacter;
