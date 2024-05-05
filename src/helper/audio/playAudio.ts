export default function playAudio(url: string) {
  var audio = new Audio(url);
  audio.play();
}
