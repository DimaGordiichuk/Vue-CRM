<?php

if (! function_exists('show_route')) {
    /**
     * @param $string
     * @return bool
     */
    function make_boolean($string): bool
    {
        return $string === "true";
    }
}
