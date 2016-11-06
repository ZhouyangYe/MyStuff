<?php
require '../../../connect.php';
require '../../../core.php';
if(!loggedin()){
	header('Location: ../../../index.php');
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Draw cube with specification of face color</title>
  </head>

  <body onload="main()">
    <canvas id="webgl" width="400" height="400" style="position: absolute; z-index: 0">
		Please use a browser that supports "canvas"
    </canvas>
	<canvas id="hud" width="400" height="400" style="position: absolute; z-index: 1"></canvas>
	<audio id="audiotag1" src="http://nifter.com/sound_effects/blips_bangs_beeps/futurebeep3_NifterDotCom.wav" preload="auto"></audio>

    <script src="lib/webgl-utils.js"></script>
    <script src="lib/webgl-debug.js"></script>
    <script src="lib/cuon-utils.js"></script>
    <script src="lib/cuon-matrix.js"></script>
    <script src="js/Lab4.js"></script>
  </body>
</html>
