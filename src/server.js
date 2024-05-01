
import { exec } from "child_process";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express, { json } from "express";
import fs from 'fs';
import { connect } from "mongoose";
import path from 'path';
import { clearInterval } from "timers";
import configViewEngine from "./config/viewEngine.js";
import corMw from "./middlewares/cors.js";
import Session from "./middlewares/session.js";
import SQLConnection from "./models/SQLConnection.js";
import redisClient from "./models/connectRedis.js";
import { _dirname } from "./path.js";
import router from "./router/index.js";

// import them de load anh tu duong dan 
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use('/public', express.static(join(__dirname, 'public')));


configViewEngine(app);

app.use(express.urlencoded({ extended: false }))

config();

const PORT = process.env.PORT;
const MONGO_DB = process.env.MONGO_DB
app.use(json())
app.use(cookieParser())
app.set('trust proxy', 1)

app.use(Session)

app.options('*', corMw);

await redisClient.connect()

connect(MONGO_DB)
    .then(() => {
        console.log('Connect database sucess')
    })
    .catch((er) => {
        console.log(er)
    })

app.use(router)

app.use((req, res) => {
    return res.send("404 not found")
})


function backupDatabase() {
    const timestamp = new Date().toISOString().replace(/:/g, '-'); // Tạo một timestamp độc đáo cho tên file sao lưu
    const backupFileName = `backup-${timestamp}.sql`;
    const backupPath = _dirname + 'backup/' + backupFileName; // Đường dẫn tới thư mục bạn muốn lưu file sao lưu

    // Sử dụng lệnh mysqldump để sao lưu cơ sở dữ liệu
    const command = `mysqldump -u${SQLConnection.config.user} -p${SQLConnection.config.password} ${SQLConnection.config.database} > ${backupPath}`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Backup failed: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Backup failed: ${stderr}`);
            return;
        }
        console.log(`Backup successful. Backup file: ${backupFileName}`);
    });
}

const backupDir = path.join(_dirname, 'backup');
const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 ngày (trong milliseconds)

// Kiểm tra và xóa các file sao lưu cũ
function cleanupOldBackups() {
    fs.readdir(backupDir, (err, files) => {
        if (err) {
            console.error('Không thể đọc thư mục backup:', err);
            return;
        }

        const currentTime = Date.now();

        files.forEach(file => {
            const filePath = path.join(backupDir, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`Không thể kiểm tra file ${file}:`, err);
                    return;
                }

                const fileAge = currentTime - stats.mtime.getTime();
                if (fileAge > maxAge) {
                    fs.unlink(filePath, err => {
                        if (err) {
                            console.error(`Không thể xóa file ${file}:`, err);
                            return;
                        }
                        console.log(`Đã xóa file cũ: ${file}`);
                    });
                }
            });
        });
    });
}
backupDatabase();
// Thiết lập công việc định kỳ sao lưu
const backupInterval = setInterval(backupDatabase, 24 * 60 * 60 * 1000); // 3600000 milliseconds = 1 giờ
const cleanupOldBackupsInterval = setInterval(cleanupOldBackups, 24 * 60 * 60 * 1000);

// Khi ứng dụng Node.js kết thúc, hủy công việc định kỳ sao lưu
process.on('SIGINT', () => {
    clearInterval(backupInterval);
    clearInterval(cleanupOldBackupsInterval)
    console.log('Backup job stopped');
    process.exit();
});

app.listen(PORT, () => {
    console.log(`Server is running on post ${PORT}`);
})



