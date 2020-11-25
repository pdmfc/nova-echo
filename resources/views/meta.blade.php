@if(!is_null(\Pdmfc\NovaEcho\NovaEcho::config('options.host')))
    <meta name="host" content="{{ \Pdmfc\NovaEcho\NovaEcho::config('options.host') }}">
@endif

@if(!is_null(\Pdmfc\NovaEcho\NovaEcho::config('options.schema')))
    <meta name="schema" content="{{ \Pdmfc\NovaEcho\NovaEcho::config('options.schema') }}">
@endif

@if(!is_null(\Pdmfc\NovaEcho\NovaEcho::config('auth_endpoint')))
    <meta name="auth_endpoint" content="{{ \Pdmfc\NovaEcho\NovaEcho::config('auth_endpoint') }}">
@endif

<meta name="token" content="{{ request()->token ?? Illuminate\Support\Facades\Cookie::get('token') }}">

@if(method_exists(request()->user(), 'receivesBroadcastNotificationsOn'))
    <meta name="user_private_channel" content="{{ request()->user()->receivesBroadcastNotificationsOn() }}">
@else
    <meta name="user_private_channel"
          content="{{ str_replace('\\', '.', get_class(request()->user())).'.'.request()->user()->id }}">
@endif
