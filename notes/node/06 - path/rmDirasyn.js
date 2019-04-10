function rmDirAsync(dir,callback) {
  fs.readdir(dir, 'utf8', function (err, files) {
    !function next(index) {
      if (err) return console.error(err);
      if (files.length == 0 || index >= files.length) {
        fs.rmdir(dir, function (err) {
          if (err) console.error(err);
          callback && callback();
        });
      } else {
        let childPath = path.join(dir,files[index])
        fs.stat(childPath, function (err, stats) {
          if (err) {
            console.error(err);
            return reject(err);
          }
          if (stats.isDirectory()) {
            rmDirAsync(childPath,()=>next(index+1))
          } else{
            fs.unlink(childPath, function (err) {
              if (err) {
                console.error(err);
              }
              next(index + 1);
            });
          }
        })
      }
    }(0);
  });
}