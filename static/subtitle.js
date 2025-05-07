function convertTime(time, difMinutes = 0, difSeconds = 0, difMillis = 0) {
    let hours = parseInt(time.slice(0, 2));
    let minutes = parseInt(time.slice(3, 5));
    let seconds = parseInt(time.slice(6, 8));
    let millis = parseInt(time.slice(9));

    let totalMillis = (((hours * 60 + minutes) * 60 + seconds) * 1000) + millis;
    let diffMillis = ((difMinutes * 60 + difSeconds) * 1000) + difMillis;

    totalMillis -= diffMillis;
    if (totalMillis < 0) totalMillis = 0;

    millis = totalMillis % 1000;
    totalMillis = Math.floor(totalMillis / 1000);

    seconds = totalMillis % 60;
    totalMillis = Math.floor(totalMillis / 60);

    minutes = totalMillis % 60;
    hours = Math.floor(totalMillis / 60) % 24;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')},${String(millis).padStart(3, '0')}`;
}

export function shiftSubtitleFile() {
    const fileInput = document.getElementById('fileInput');
    if (!fileInput.files.length) {
        alert("Please upload an SRT file first.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        const lines = content.split(/\r?\n/);
        const timeRegex = /(\d{2}:\d{2}:\d{2},\d{3})/g;
        const difMinutes = parseInt(document.getElementById('offsetMinutes').value) || 0;
        const difSeconds = parseInt(document.getElementById('offsetSeconds').value) || 0;
        const difMillis = parseInt(document.getElementById('offsetMillis').value) || 0;
        const output = [];

        for (let line of lines) {
            const matches = [...line.matchAll(timeRegex)];
            if (matches.length >= 2) {
                const begin = matches[0][0];
                const end = matches[1][0];
                const newBegin = convertTime(begin, difMinutes, difSeconds, difMillis);
                const newEnd = convertTime(end, difMinutes, difSeconds, difMillis);
                line = line.replace(begin, newBegin).replace(end, newEnd);
            }
            output.push(line);
        }

        const blob = new Blob([output.join('\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "shifted_" + file.name;
        a.click();
        URL.revokeObjectURL(url);
    };

    reader.readAsText(file);
}