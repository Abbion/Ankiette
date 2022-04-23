<?php

class Question {
    private $type;
    private $content;
    private $required;
    private $answers;

    public function __construct($type, $content, $required, $answers = null)
    {
        $this->type = $type;
        $this->content = $content;
        $this->required = $required;
        $this->answers = $answers;
    }

    public function getType()
    {
        return $this->type;
    }

    public function setType($type)
    {
        $this->type = $type;
    }

    public function getContent()
    {
        return $this->content;
    }

    public function setContent($content)
    {
        $this->content = $content;
    }

    public function getRequired()
    {
        return $this->required;
    }

    public function setRequired($required)
    {
        $this->required = $required;
    }

    public function getAnswers()
    {
        return $this->answers;
    }

    public function setAnswers($answers)
    {
        $this->answers = $answers;
    }


}