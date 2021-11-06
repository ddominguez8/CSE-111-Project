#!/bin/bash

db="cars.sqlite"
rm -f ${db}
touch ${db}

sqlite3 ${db} < script.sql
