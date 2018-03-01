<?php
  require __DIR__ . '/vendor/autoload.php';

  $options = array(
    'cluster' => 'ap2',
    'encrypted' => true
  );
  $pusher = new Pusher\Pusher(
    '3644954be91960bd4452',
    '53410b5c5a8ebd2f9101',
    '455716',
    $options
  );

  $data['message'] = 'hello world';
  $pusher->trigger('my-channel', 'my-event', $data);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Pusher Test</title>
  <script src="https://js.pusher.com/4.1/pusher.min.js"></script>
  <script>

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('3644954be91960bd4452', {
      cluster: 'ap2',
      encrypted: true
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      alert(data.message);
    });
  </script>
</head>
<body>
	
	
</body>
</html>