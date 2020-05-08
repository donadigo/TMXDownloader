chrome.runtime.onMessage.addListener(
    function (request, sender, res) {
        chrome.downloads.download({
            url: request.download,
            filename: request.download.replace("https://tmnforever.tm-exchange.com/get.aspx?action=recordgbx&id=", "") + '.Replay.Gbx'
        });
    }
)