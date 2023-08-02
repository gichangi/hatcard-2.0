<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <base href="/">
    <!-- Favicon & Manifest -->
    {{--<link rel="shortcut icon" href="/images/apple-touch-icon.png" />--}}
    <link rel="shortcut icon" href="/images/vsp-favicon.png" />
    <link rel="stylesheet" href="#" type="text/html" >

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Google Fonts Style -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet" />
    <script type="module" src="https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js"></script>
    <title>CARD</title>
    <script>
        window.global = window;
    </script>
    <script type="module">
        import process from "process";
        import EventEmitter from "events";
        import {Buffer} from "buffer";
        window.Buffer = Buffer;
        window.process = process;
        window.EventEmitter = EventEmitter;
    </script>
    <script>var global = window</script>
    @viteReactRefresh
    @vite(['resources/js/index.jsx'])
    @inertiaHead
</head>
<body>
@inertia
<div id="root"></div>
</body>
</html>
