<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <!-- Favicon & Manifest -->
    <link rel="shortcut icon" href="/images/apple-touch-icon.png" />

    <!-- Google Fonts Style -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet" />
    <title>HATCARD</title>
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
