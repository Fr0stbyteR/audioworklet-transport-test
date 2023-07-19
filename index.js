(async () => {
    const { default: TransportNode } = await import("./TransportNode.js");
    const audioContext = new AudioContext({ latencyHint: 0.0001 });
    await audioContext.audioWorklet.addModule('./TransportProcessor.js');
    const transportNode = new TransportNode(audioContext);
    transportNode.connect(audioContext.destination);
    document.getElementById("start").onclick = () => {
        audioContext.resume();
        transportNode.start();
    };
})();
