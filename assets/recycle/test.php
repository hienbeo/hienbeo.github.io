<?php 

$url = "http://www.phimmoi.net/phim/huyen-thoai-cua-ngay-mai-phan-4-7585/xem-phim.html";

$ch = curl_init();

{
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $headers = array();
    $headers[] = "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36";
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
}

{
    // // Option 1, port code js decode to php
    function wise($w, $i, $s, $e) {
        $lIll = 0;
        $ll1I = 0;
        $Il1l = 0;
        $ll1l = [];
        $l1lI = [];
        while (true) {
            if ($lIll < 5) $l1lI[] = ($w[$lIll]);
            else if ($lIll < strlen($w)) $ll1l[] = ($w[$lIll]);
            $lIll++;
            if ($ll1I < 5) $l1lI[] = ($i[$ll1I]);
            else if ($ll1I < strlen($i)) $ll1l[] = ($i[$ll1I]);
            $ll1I++;
            if ($Il1l < 5) $l1lI[] = ($s[$Il1l]);
            else if ($Il1l < strlen($s)) $ll1l[] = ($s[$Il1l]);
            $Il1l++;
            if (strlen($w) + strlen($i) + strlen($s) + strlen($e) == count($ll1l) + count($l1lI) + strlen($e)) break;
        }
        $lI1l = join('', $ll1l);
        $I1lI = join('', $l1lI);
        $ll1I = 0;
        $l1ll = [];
        for ($lIll = 0; $lIll < count($ll1l); $lIll += 2) {
            $ll11 = -1;
            // if ($I1lI.charCodeAt($ll1I) % 2) $ll11 = 1;
            if (ord($I1lI[($ll1I)]) % 2) $ll11 = 1;
            // $l1ll[] = (String.fromCharCode(parseInt($lI1l.substr($lIll, 2), 36) - $ll11));
            $t1 = substr($lI1l, $lIll, 2);
            $t2 = base_convert($t1, 36, 10);
            $l1ll[] = chr($t2 - $ll11);
            $ll1I++;
            if ($ll1I >= count($l1lI)) $ll1I = 0;
        }
        return join('',  $l1ll);
    }
    foreach (range(1, 3) as $i) {
        $re = "/;eval\(function\(w,i,s,e\){var lIll=0.*;}\('(\w+)','(\w+)','(\w+)','(\w+)'\)\);/";
        preg_match($re, $result, $matches);
        $result = wise($matches[1], $matches[2], $matches[3], $matches[4]);
    }

    // // Option 2 , call system node file, *** UNSAFE ***
    // $re = "/;eval\(function\(w,i,s,e\){var lIll=0.*;}\('(\w+)','(\w+)','(\w+)','(\w+)'\)\);/";
    // preg_match($re, $result, $matches);
    // $result = $matches[0];
    // foreach (range(1,3) as $i) {
    //     $result = str_replace('eval', 'console.log', $result);
    //     $filename = time();
    //     file_put_contents($filename, $result);
    //     $result = shell_exec("node $filename");
    //     unlink($filename);
    // }

    $re = '/token=(\w+)/';
    preg_match($re, $result, $matches);
    $token = $matches[1];

    $re = '/filmid=(\w+)/';
    preg_match($re, $result, $matches);
    $filmid = $matches[1];

    $re = '/episodeid=(\w+)/';
    preg_match($re, $result, $matches);
    $episodeid = $matches[1];
}

{
    curl_setopt($ch, CURLOPT_URL, "http://episode.phimmoi.net/episodeinfo-v1.2.php?ip=null&number=1&part=0&filmslug=null&type=json&token={$token}&episodeid={$episodeid}&filmid={$filmid}");

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
}


print_r($result);
