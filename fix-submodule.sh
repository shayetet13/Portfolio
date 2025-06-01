#!/bin/bash
# ลบ submodule ที่มีปัญหา
git submodule deinit -f Portfolio
git rm -f Portfolio
rm -rf .git/modules/Portfolio

# ลบไฟล์ .gitmodules ถ้าไม่มี submodule อื่น
rm -f .gitmodules

# Commit การเปลี่ยนแปลง
git add .
git commit -m "Remove problematic submodule"
git push origin main
