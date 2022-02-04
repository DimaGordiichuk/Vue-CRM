<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" value="{{ csrf_token() }}"/>
    <title>Laravel + Vue</title>
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link href="{{ asset('/css/app.css') }}" type="text/css" rel="stylesheet"/>
    <link href="{{ asset('/css/index.css') }}" type="text/css" rel="stylesheet"/>
    <script>
        window.app = {
            staticRoot: "{{ config('app.asset_url') }}"
        }
    </script>
</head>
<body>
{{--    @if (Auth::check())--}}
{{--        <script>--}}
{{--            window.Laravel = {!!json_encode([--}}
{{--                'isLoggedin' => true,--}}
{{--                'user' => Auth::user()--}}
{{--            ])!!}--}}
{{--        </script>--}}
{{--    @else--}}
{{--        <script>--}}
{{--            window.Laravel = {!!json_encode([--}}
{{--                'isLoggedin' => false--}}
{{--            ])!!}--}}
{{--        </script>--}}
{{--    @endif--}}
    <div id="app">
    </div>
    <script src="{{ asset('/js/app.js') }}" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
</body>
</html>

