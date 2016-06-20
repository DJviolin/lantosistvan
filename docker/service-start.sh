#!/bin/bash

fleetctl submit ./lantosistvan.service && fleetctl start lantosistvan.service; fleetctl journal -follow=true -lines=50 lantosistvan
