import * as BABYLON from "babylonjs"
import Hls from "hls.js"

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
const engine = new BABYLON.Engine(canvas, true);

const createScene = function (videoElem: HTMLVideoElement) {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera('Camera', -1, 0, 1, new BABYLON.Vector3(0, 0, 0), scene);

    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight('Light', new BABYLON.Vector3(0, 0, 0), scene);

    const videoDome = new BABYLON.VideoDome(
        'VideoDome',
        videoElem,
        {},
        scene
    );

    return scene;

};

const videoElem = document.getElementById('video') as HTMLVideoElement;

const scene = createScene(videoElem);

const playPauseVideoDome = () => {
    const videoDome = scene.getNodeByName('VideoDome') as BABYLON.VideoDome;
    const video = videoDome.videoTexture.video;
    video.paused ? video.play() : video.pause();
}

scene.onKeyboardObservable.add(e => {
    switch (e.event.type) {
        case 'keydown':
            if (e.event.key === ' ') {
                playPauseVideoDome();
            }
            break;
    }
})

const vrHelper = scene.createDefaultVRExperience();
vrHelper.enableInteractions();

vrHelper.onControllerMeshLoaded.add((webVRController) => {
    var controllerMesh = webVRController.mesh;
    webVRController.onTriggerStateChangedObservable.add(() => {
      playPauseVideoDome();
    });
});

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener('resize', function () {
    engine.resize();
});

const playVideoDome = () => {
    const videoDome = scene.getNodeByName('VideoDome') as BABYLON.VideoDome
    videoDome.videoTexture.video.play()
}

if (Hls.isSupported()) {
    const hls = new Hls({ autoStartLoad: true });
    hls.loadSource('/live/stream.m3u8');
    hls.attachMedia(videoElem);
    hls.on(Hls.Events.MANIFEST_PARSED, playVideoDome);
    hls.startLoad();
}
