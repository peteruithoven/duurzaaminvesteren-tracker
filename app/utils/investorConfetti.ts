import confetti from "canvas-confetti";

export default function investorConfetti({ minimal }: { minimal: boolean }) {
  confetti({
    disableForReducedMotion: true,
    origin: { y: 1, x: 1 },
    particleCount: minimal ? 50 : 100,
    spread: 90,
    angle: 45 + 90,
    startVelocity: 45,
    gravity: 0.5,
    ticks: 400,
  });
}
