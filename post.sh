#!/bin/bash

# Step 1: Check if docs or _posts exists
if [ -d "docs" ] && [ -d "_posts" ]; then
    echo "Choose target folder:"
    select target in "docs" "_posts"; do
        [ -n "$target" ] && break
    done
elif [ -d "docs" ]; then
    target="docs"
elif [ -d "_posts" ]; then
    target="_posts"
else
    echo "No 'docs' or '_posts' folder found."
    exit 1
fi

# Step 2: Get current year and month automatically
year=$(date +"%Y")
month=$(date +"%m")
month_folder="$target/$year/$month"
mkdir -p "$month_folder"

# Step 3: Ask for title
read -p "Enter post title: " title
title_slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')

# Step 4: Create date formats
date_full=$(date +"%Y-%m-%d-%H:%M:%S")   # for inside post
date_short=$(date +"%Y-%m-%d")           # for filename

# Step 5: Create base file name
base_name="$date_short-$title_slug"
file_path="$month_folder/$base_name.md"

# Step 6: Check for duplicates and add part numbers
if [ -f "$file_path" ]; then
    part=2
    while [ -f "$month_folder/$base_name-part-$part.md" ]; do
        part=$((part+1))
    done
    file_path="$month_folder/$base_name-part-$part.md"
fi

# Step 7: Write front matter
cat <<EOF > "$file_path"
---
title: "$title"
date: $date_full
layout: post
hidden: true
---
EOF

echo "Post created: $file_path"
