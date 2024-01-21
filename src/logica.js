import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming you have a CSS file for styling

const App = () => {
  const [gameSpeed, setGameSpeed] = useState(20);
  const [xPosBg, setXPosBg] = useState(0);
  const [yPosBg, setYPosBg] = useState(380);
  const [points, setPoints] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [deathCount, setDeathCount] = useState(0);
  const [pause, setPause] = useState(false);

  const SCREEN_HEIGHT = 600;
  const SCREEN_WIDTH = 1100;

  const RUNNING = [
    'DinoRun1.png',
    'DinoRun2.png',
  ];

  const JUMPING = 'DinoJump.png';

  const DUCKING = [
    'DinoDuck1.png',
    'DinoDuck2.png',
  ];

  const SMALL_CACTUS = [
    'SmallCactus1.png',
    'SmallCactus2.png',
    'SmallCactus3.png',
  ];

  const LARGE_CACTUS = [
    'LargeCactus1.png',
    'LargeCactus2.png',
    'LargeCactus3.png',
  ];

  const BIRD = [
    'Bird1.png',
    'Bird2.png',
  ];

  const CLOUD = 'Cloud.png';

  const BG = 'Track.png';

  const loadImage = (imageName) => {
    const image = new Image();
    image.src = `/assets/${imageName}`;
    return image;
  };

  const [dinoDuck, setDinoDuck] = useState(false);
  const [dinoRun, setDinoRun] = useState(true);
  const [dinoJump, setDinoJump] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [jumpVel, setJumpVel] = useState(8.5);
  const [dinoRect, setDinoRect] = useState({ x: 80, y: 310 });

  const DUCKING_IMAGES = DUCKING.map((imageName) => loadImage(`Dino/${imageName}`));
  const RUNNING_IMAGES = RUNNING.map((imageName) => loadImage(`Dino/${imageName}`));
  const JUMPING_IMAGE = loadImage(`Dino/${JUMPING}`);

  const player = {
    duckImg: DUCKING_IMAGES,
    runImg: RUNNING_IMAGES,
    jumpImg: JUMPING_IMAGE,
    dinoDuck,
    dinoRun,
    dinoJump,
    stepIndex,
    jumpVel,
    image: RUNNING_IMAGES[0],
    dinoRect,
  };

  const Cloud = () => {
    const x = SCREEN_WIDTH + Math.floor(Math.random() * 200);
    const y = Math.floor(Math.random() * 50) + 50;
    const image = loadImage(CLOUD);
    const width = image.width;

    const update = () => {
      setXPosBg((prevXPos) => prevXPos - gameSpeed);
      if (x < -width) {
        setXPosBg(SCREEN_WIDTH + Math.floor(Math.random() * 500));
        setYPosBg(Math.floor(Math.random() * 50) + 50);
      }
    };

    const draw = () => {
      const canvas = document.getElementById('gameCanvas');
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, x, y);
    };

    return { update, draw };
  };

  const Obstacle = (type) => {
    const image = type === 'bird' ? BIRD.map((imageName) => loadImage(`Bird/${imageName}`)) : type === 'large' ? LARGE_CACTUS.map((imageName) => loadImage(`Cactus/${imageName}`)) : SMALL_CACTUS.map((imageName) => loadImage(`Cactus/${imageName}`));
    const rect = { x: SCREEN_WIDTH, y: 0, width: image[0].width, height: image[0].height };

    const update = () => {
      rect.x -= gameSpeed;
      if (rect.x < -rect.width) {
        setObstacles((prevObstacles) => prevObstacles.slice(0, -1));
      }
    };

    const draw = () => {
      const canvas = document.getElementById('gameCanvas');
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image[0], rect.x, rect.y);
    };

    return { update, draw };
  };

  const SmallCactus = () => {
    const type = Math.floor(Math.random() * 3);
    return Obstacle('small');
  };

  const LargeCactus = () => {
    const type = Math.floor(Math.random() * 3);
    return Obstacle('large');
  };

  const BirdObstacle = () => Obstacle('bird');

  const cloud = Cloud();

  const score = () => {
    setPoints((prevPoints) => prevPoints + 1);
    if (points % 100 === 0) {
      setGameSpeed((prevSpeed) => prevSpeed + 1);
    }
  };

  const background = () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const imageWidth = loadImage(BG).width;
    ctx.drawImage(loadImage(BG), xPosBg, yPosBg);
    ctx.drawImage(loadImage(BG), imageWidth + xPosBg, yPosBg);
    if (xPosBg <= -imageWidth) {
      ctx.drawImage(loadImage(BG), imageWidth + xPosBg, yPosBg);
      setXPosBg(0);
    }
    setXPosBg((prevXPos) => prevXPos - gameSpeed);
  };

  const unpause = () => {
    setPause(false);
  };

  const paused = () => {
    setPause(true);
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText('Game Paused, Press \'u\' to Unpause', SCREEN_WIDTH / 2, SCREEN_HEIGHT / 3);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'p') {
        setPause(true);
        paused();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const handlePauseKeyPress = (event) => {
      if (event.key === 'u') {
        unpause();
      }
    };

    if (pause) {
      document.addEventListener('keydown', handlePauseKeyPress);
    } else {
      document.removeEventListener('keydown', handlePauseKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handlePauseKeyPress);
    };
  }, [pause]);

  useEffect(() => {
    const handleMenuKeyPress = (event) => {
      if (event.key) {
        setDeathCount(0);
        main();
      }
    };

    if (deathCount > 0) {
      document.addEventListener('keydown', handleMenuKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleMenuKeyPress);
    };
  }, [deathCount]);

  const menu = () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    let run = true;

    const handleMenuKeyPress = (event) => {
      if (event.key) {
        setDeathCount((prevDeathCount) => prevDeathCount + 1);
      }
    };

    document.addEventListener('keydown', handleMenuKeyPress);

    const current_time = new Date().getHours();

    if (current_time > 7 && current_time < 19) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    } else {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    }

    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';

    if (deathCount === 0) {
      ctx.fillText('Press any Key to Start', SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    } else if (deathCount > 0) {
      ctx.fillText('Press any Key to Restart', SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
      ctx.font = '20px Arial';
      const scoreText = `Your Score: ${points}`;
      const highscoreText = `High Score : ${Math.max(...fs.readFileSync('score.txt', 'utf8').split(' ').map(Number))}`;
      ctx.fillText(scoreText, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 + 50);
      ctx.fillText(highscoreText, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 + 100);
      fs.appendFileSync('score.txt', `${points}\n`);
    }

    ctx.font = '30px Arial';
    const textRect = { center: { x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 2 } };
    ctx.fillText('Press any Key to Restart', textRect.center.x, textRect.center.y);
    ctx.drawImage(RUNNING_IMAGES[0], SCREEN_WIDTH / 2 - 20, SCREEN_HEIGHT / 2 - 140);

    document.removeEventListener('keydown', handleMenuKeyPress);

    if (run) {
      main();
    }
  };

  const main = () => {
    let run = true;
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const clock = setInterval(() => {
      const current_time = new Date().getHours();

      if (current_time > 7 && current_time < 19) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      } else {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      }

      const userInput = {}; // Handle user input events

      player.draw();
      player.update(userInput);

      if (obstacles.length === 0) {
        const rand = Math.floor(Math.random() * 3);
        if (rand === 0) {
          setObstacles((prevObstacles) => [...prevObstacles, SmallCactus()]);
        } else if (rand === 1) {
          setObstacles((prevObstacles) => [...prevObstacles, LargeCactus()]);
        } else if (rand === 2) {
          setObstacles((prevObstacles) => [...prevObstacles, BirdObstacle()]);
        }
      }

      obstacles.forEach((obstacle) => {
        obstacle.draw();
        obstacle.update();
        // Handle collision detection
      });

      background();

      cloud.draw();
      cloud.update();

      score();

      if (run) {
        // Handle other game events
      }
    }, 1000 / 30);

    const t1 = setInterval(() => {
      for (const event of events) {
        // Handle other events
      }
    }, 1000 / 30);
  };

  return (
    <div>
      <canvas id="gameCanvas" width={SCREEN_WIDTH} height={SCREEN_HEIGHT}></canvas>
    </div>
  );
};

export default App;
