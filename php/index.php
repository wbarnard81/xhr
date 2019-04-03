<?php
//The headers
$headers = array("Name", "Website");

$data = array(
    array(
        'name' => 'John Morris',
        'website' => 'www.jmorris.com'
    ),
    array(
        'name' => 'John Doe',
        'website' => 'www.john.com'
    ),
    array(
        'name' => 'Sam Smith',
        'website' => 'www.smith.co.za'
    ),
);


//Open/Create the file
$fh = fopen('file.csv', 'w');

//Create the headers
fputcsv($fh, $headers);

//populate the data 
foreach($data as $fields){
    fputcsv($fh, $fields);
}

//Close the file
fclose($fh);