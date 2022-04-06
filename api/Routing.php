<?php

require_once 'src/controllers/DefaultController.php';
require_once 'src/controllers/SecurityController.php';

class Routing
{
    public static $routes;

    public static function get($url, $endpoint)
    {
        self::$routes[$url] = $endpoint;
    }

    public static function post($url, $endpoint)
    {
        self::$routes[$url] = $endpoint;
    }

    public static function run($url)
    {
        $urlParts = explode("/", $url);
        $action = $urlParts[0];

        if(!array_key_exists($action, self::$routes)) {
            die("Wrong url!");
        }

        $controller = self::$routes[$action];
        $object = new $controller;
        $action = $action ?: 'index';

        $id = $urlParts[1] ?? '';

        $object->$action($id);
    }

}