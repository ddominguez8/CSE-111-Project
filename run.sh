#!/bin/bash

db="cars.sqlite"
rm -f ${db}
touch ${db}

sqlite3 ${db} < creation.sql
sqlite3 ${db} < insert.sql
