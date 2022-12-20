<?php

class Database
{
    public $connection;

    public function __construct($config, $username = 'root', $password = '')
    {
        $dsn = "mysql:" . http_build_query($config, '', ';');
        $this->connection = new PDO($dsn, $username, $password, [
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    }

    public function query($query, $params = [])
    {
        $statement = $this->connection->prepare($query);
        $statement->execute($params);
        return $statement;
    }

    public function get($collection, $additional) {
        $q = "SELECT * FROM `$collection` $additional";
        return $this->query($q)->fetch();
    }

    public function get_all($collection) {
        $q = "SELECT * FROM `$collection`";
        return $this->query($q)->fetchAll();
    }

    public function get_one_by_field($field, $fieldValue, $collection) {
        $q = "SELECT * FROM `$collection` WHERE $field = '$fieldValue'";
        return $this->query($q)->fetch();
    }

    public function create($table, $data) {
        $q = "INSERT INTO $table SET ";

        $i = 0;
        foreach($data as $key => $value) {
            if ( $i === 0 ) {
                $q = $q . " $key=" . "'$value'";
            } else {
                $q = $q . ", $key=" . "'$value'";
            }
            $i++;
        }

        return $this->query($q);
    }

    public function update_to_collection($table, $data, $condition) {
        $q = "UPDATE `$table` SET $data $condition";

        $i = 0;
        foreach($data as $key => $value) {
            if ( $i === 0 ) {
                $q = $q . " $key=" . "'$value'";
            } else {
                $q = $q . ", $key=" . "'$value'";
            }
            $i++;
        }

        return $this->query($q);
    }

    public function delete($table, $id) {
        $q = "DELETE FROM $table WHERE id = $id";
        return $this->query($q);
    }

    public function upload($name_field, $directory)
    {
        $uploads_dir = 'uploads/' . $directory;
        $tmp_name = $_FILES[$name_field]["tmp_name"];
        $name = basename($_FILES[$name_field]["name"]);
        if ( move_uploaded_file($tmp_name, "$uploads_dir/$name") ) {
            $_POST[$name_field] = "$uploads_dir/$name";
            return true;
        }
        return false;
    }

}