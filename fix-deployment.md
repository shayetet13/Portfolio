# วิธีแก้ไขปัญหา Netlify Deployment - คำสั่งที่ต้องรัน:

## สำหรับ Windows Command Prompt:

### ขั้นตอนที่ 1: ลบ submodule และทำความสะอาด

```cmd
git submodule deinit -f --all
git rm --cached Portfolio
rmdir /s /q Portfolio
rmdir /s /q .git\modules\Portfolio
del .gitmodules
```

### ขั้นตอนที่ 2: แก้ไข Git config (ลบ submodule section)

```cmd
git config --remove-section submodule.Portfolio
```

### ขั้นตอนที่ 3: Add และ commit การเปลี่ยนแปลง

```cmd
git add .
git commit -m "Remove problematic submodule and fix deployment"
```

### ขั้นตอนที่ 4: Push ไปยัง GitHub

```cmd
git push origin main
```

## สำหรับ Windows PowerShell:

### ขั้นตอนที่ 1: ลบ submodule และทำความสะอาด

```powershell
git submodule deinit -f --all
git rm --cached Portfolio
Remove-Item -Recurse -Force Portfolio -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .git\modules\Portfolio -ErrorAction SilentlyContinue
Remove-Item .gitmodules -ErrorAction SilentlyContinue
```

### ขั้นตอนที่ 2: แก้ไข Git config (ลบ submodule section)

```powershell
git config --remove-section submodule.Portfolio
```

### ขั้นตอนที่ 3: Add และ commit การเปลี่ยนแปลง

```powershell
git add .
git commit -m "Remove problematic submodule and fix deployment"
```

### ขั้นตอนที่ 4: Push ไปยัง GitHub

```powershell
git push origin main
```

## ขั้นตอนที่ 5: ตรวจสอบผลลัพธ์

- Netlify จะ rebuild อัตโนมัติหลังจาก push
- ตรวจสอบที่ Netlify Dashboard ว่า deployment สำเร็จหรือไม่
- หากยังมีปัญหา ให้ trigger manual deploy ใน Netlify

## ทางเลือกหากคำสั่งข้างต้นไม่ทำงาน (Command Prompt):

```cmd
git rm -rf Portfolio
git rm .gitmodules
rmdir /s /q .git\modules
git add .
git commit -m "Force remove all submodule references"
git push origin main --force
```

## ทางเลือกหากคำสั่งข้างต้นไม่ทำงาน (PowerShell):

```powershell
git rm -rf Portfolio
git rm .gitmodules
Remove-Item -Recurse -Force .git\modules -ErrorAction SilentlyContinue
git add .
git commit -m "Force remove all submodule references"
git push origin main --force
```

## ตรวจสอบก่อน push (Command Prompt):

```cmd
# ตรวจสอบสถานะ Git
git status

# ตรวจสอบว่าไม่มี submodule เหลืออยู่
type .gitmodules
dir | findstr Portfolio
```

## ตรวจสอบก่อน push (PowerShell):

```powershell
# ตรวจสอบสถานะ Git
git status

# ตรวจสอบว่าไม่มี submodule เหลืออยู่
Get-Content .gitmodules -ErrorAction SilentlyContinue
Get-ChildItem | Where-Object { $_.Name -like "*Portfolio*" }
```

## 🔧 คำแนะนำ:

- **Command Prompt**: เหมาะสำหรับผู้ใช้ที่คุ้นเคยกับ cmd
- **PowerShell**: มีความสามารถมากกว่าและปลอดภัยกว่า
- **Git Bash**: หากติดตั้ง Git แล้วจะมี Git Bash ที่รองรับคำสั่ง Unix/Linux

## หากใช้ Git Bash (รองรับคำสั่งแบบ Linux):

```bash
git submodule deinit -f --all
git rm --cached Portfolio
rm -rf Portfolio
rm -rf .git/modules/Portfolio
rm -f .gitmodules
git config --remove-section submodule.Portfolio
git add .
git commit -m "Remove problematic submodule and fix deployment"
git push origin main
```
