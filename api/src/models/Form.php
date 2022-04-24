<?php

class Form {
    public $title;
    public  $startDate;
    public  $endDate;
    public  $code;


    public function __construct($title, $startDate, $endDate, $code) {
        $this->title = $title;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->code = $code;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function getStartDate()
    {
        return $this->startDate;
    }

    public function setStartDate($startDate)
    {
        $this->startDate = $startDate;
    }

    public function getEndDate()
    {
        return $this->endDate;
    }

    public function setEndDate($endDate)
    {
        $this->endDate = $endDate;
    }

    public function getCode()
    {
        return $this->code;
    }

    public function setCode($code)
    {
        $this->code = $code;
    }


}