var schema = new Schema({
    name: {
        type: String,

    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Config', schema);
var requrl = "http://wohlig.io/api/";
var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    maxRow: 20,
    getForeignKeys: function (schema) {
        var arr = [];
        _.each(schema.tree, function (n, name) {
            if (n.key) {
                arr.push({
                    name: name,
                    ref: n.ref,
                    key: n.key
                });
            }
        });
        return arr;
    },
    checkRestrictedDelete: function (Model, schema, data, callback) {

        var values = schema.tree;
        var arr = [];
        var ret = true;
        _.each(values, function (n, key) {
            if (n.restrictedDelete) {
                arr.push(key);
            }
        });

        Model.findOne({
            "_id": data._id
        }, function (err, data2) {
            if (err) {
                callback(err, null);
            } else if (data2) {
                _.each(arr, function (n) {
                    if (data2[n].length !== 0) {
                        ret = false;
                    }
                });
                callback(null, ret);
            } else {
                callback("No Data Found", null);
            }
        });
    },
    manageArrayObject: function (Model, id, data, key, action, callback) {
        Model.findOne({
            "_id": id
        }, function (err, data2) {
            if (err) {
                callback(err, null);
            } else if (data2) {
                switch (action) {
                    case "create":
                        {
                            data2[key].push(data);
                            data2[key] = _.uniq(data2[key]);
                            data2.update(data2, {
                                w: 1
                            }, callback);
                        }
                        break;
                    case "delete":
                        {
                            _.remove(data2[key], function (n) {
                                return (n + "") == (data + "");
                            });
                            data2.update(data2, {
                                w: 1
                            }, callback);
                        }
                        break;
                }
            } else {
                callback(null, null);
            }
        });


    },

    uploadFile: function (filename, callback) {
        var id = mongoose.Types.ObjectId();
        var extension = filename.split(".").pop();
        extension = extension.toLowerCase();
        if (extension == "jpeg") {
            extension = "jpg";
        }
        var newFilename = id + "." + extension;
        var MaxImageSize = 1200;

        var writestream = gfs.createWriteStream({
            filename: newFilename
        });
        writestream.on('finish', function () {
            callback(null, {
                name: newFilename
            });
            fs.unlink(filename);
        });

        var imageStream = fs.createReadStream(filename);

        if (extension == "png" || extension == "jpg" || extension == "gif") {
            Jimp.read(filename, function (err, image) {
                if (err) {
                    callback(err, null);
                } else {
                    if (image.bitmap.width > MaxImageSize || image.bitmap.height > MaxImageSize) {
                        image.scaleToFit(MaxImageSize, MaxImageSize).getBuffer(Jimp.AUTO, function (err, imageBuf) {
                            var bufferStream = new stream.PassThrough();
                            bufferStream.end(imageBuf);
                            bufferStream.pipe(writestream);
                        });
                    } else {
                        image.getBuffer(Jimp.AUTO, function (err, imageBuf) {
                            var bufferStream = new stream.PassThrough();
                            bufferStream.end(imageBuf);
                            bufferStream.pipe(writestream);
                        });
                    }

                }

            });
        } else {
            imageStream.pipe(writestream);
        }


    },
    readUploaded: function (filename, width, height, style, res) {
        res.set({
            'Cache-Control': 'public, max-age=31557600',
            'Expires': new Date(Date.now() + 345600000).toUTCString()
        });
        var readstream = gfs.createReadStream({
            filename: filename
        });
        readstream.on('error', function (err) {
            res.json({
                value: false,
                error: err
            });
        });
        var buf;
        var newNameExtire;
        var bufs = [];
        var proceedI = 0;
        var wi;
        var he;
        readstream.on('data', function (d) {
            bufs.push(d);
        });
        readstream.on('end', function () {
            buf = Buffer.concat(bufs);
            proceed();
        });


        function proceed() {
            proceedI++;
            if (proceedI === 2) {
                Jimp.read(buf, function (err, image) {
                    if (err) {
                        callback(err, null);
                    } else {
                        if (style === "contain" && width && height) {
                            image.contain(width, height).getBuffer(Jimp.AUTO, writer2);
                        } else if (style === "cover" && (width && width > 0) && (height && height > 0)) {
                            image.cover(width, height).getBuffer(Jimp.AUTO, writer2);
                        } else if ((width && width > 0) && (height && height > 0)) {
                            image.resize(width, height).getBuffer(Jimp.AUTO, writer2);
                        } else if ((width && width > 0) && !(height && height > 0)) {
                            image.resize(width, Jimp.AUTO).getBuffer(Jimp.AUTO, writer2);
                        } else {
                            image.resize(Jimp.AUTO, height).getBuffer(Jimp.AUTO, writer2);
                        }
                    }
                });
            }
        }

        function writer2(err, imageBuf) {
            var writestream2 = gfs.createWriteStream({
                filename: newNameExtire,
            });
            var bufferStream = new stream.PassThrough();
            bufferStream.end(imageBuf);
            bufferStream.pipe(writestream2);
            res.send(imageBuf);
        }

        function read2(filename2) {
            var readstream2 = gfs.createReadStream({
                filename: filename2
            });
            readstream2.on('error', function (err) {
                res.json({
                    value: false,
                    error: err
                });
            });
            readstream2.pipe(res);
        }
        var onlyName = filename.split(".")[0];
        var extension = filename.split(".").pop();
        if ((extension == "jpg" || extension == "png" || extension == "gif") && ((width && width > 0) || (height && height > 0))) {
            //attempt to get same size image and serve
            var newName = onlyName;
            if (width > 0) {
                newName += "-" + width;
            } else {
                newName += "-" + 0;
            }
            if (height) {
                newName += "-" + height;
            } else {
                newName += "-" + 0;
            }
            if (style && (style == "contain" || style == "cover")) {
                newName += "-" + style;
            } else {
                newName += "-" + 0;
            }
            newNameExtire = newName + "." + extension;
            gfs.exist({
                filename: newNameExtire
            }, function (err, found) {
                if (err) {
                    res.json({
                        value: false,
                        error: err
                    });
                }
                if (found) {
                    read2(newNameExtire);
                } else {
                    proceed();
                }
            });
            //else create a resized image and serve
        } else {
            readstream.pipe(res);
        }
        //error handling, e.g. file does not exist
    },

    import: function (name) {
        var jsonExcel = xlsx.parse(name);
        var retVal = [];
        var firstRow = _.slice(jsonExcel[0].data, 0, 1)[0];
        var excelDataToExport = _.slice(jsonExcel[0].data, 1);
        var dataObj = [];
        _.each(excelDataToExport, function (val, key) {
            dataObj.push({});
            _.each(val, function (value, key2) {
                dataObj[key][firstRow[key2]] = value;
            });
        });
        return dataObj;
    },
    importGS: function (filename, callback) {
        var readstream = gfs.createReadStream({
            filename: filename
        });
        readstream.on('error', function (err) {
            res.json({
                value: false,
                error: err
            });
        });
        var buffers = [];
        readstream.on('data', function (buffer) {
            buffers.push(buffer);
        });
        readstream.on('end', function () {
            var buffer = Buffer.concat(buffers);
            callback(null, Config.import(buffer));
        });
    },
    generateExcel: function (name, found, res) {
        name = _.kebabCase(name);
        var excelData = [];
        _.each(found, function (singleData) {
            var singleExcel = {};
            _.each(singleData, function (n, key) {
                if (key != "__v" && key != "createdAt" && key != "updatedAt") {
                    // singleExcel[_.capitalize(key)] = n;
                    // console.log("in excel", n);
                    singleExcel[key] = n;
                }
            });
            excelData.push(singleExcel);
        });
        var xls = json2xls(excelData);
        var folder = "././.tmp/";
        var path = name + "-" + moment().format("MMM-DD-YYYY-hh-mm-ss-a") + ".xlsx";
        var finalPath = folder + path;
        fs.writeFile(finalPath, xls, 'binary', function (err) {
            if (err) {
                res.callback(err, null);
            } else {
                fs.readFile(finalPath, function (err, excel) {
                    if (err) {
                        res.callback(err, null);
                    } else {
                        res.set('Content-Type', "application/octet-stream");
                        res.set('Content-Disposition', "attachment;filename=" + path);
                        res.send(excel);
                        fs.unlink(finalPath);
                    }
                });
            }
        });

    },
    generateExcelOld: function (name, found, res) {
        name = _.kebabCase(name);
        var excelData = [];
        _.each(found, function (singleData) {
            var singleExcel = {};
            _.each(singleData, function (n, key) {
                if (key != "__v" && key != "createdAt" && key != "updatedAt") {
                    // singleExcel[_.capitalize(key)] = n;
                    // console.log("in excel", n);
                    singleExcel[key] = n;
                }
            });
            excelData.push(singleExcel);
        });
        var xls = json2xls(excelData);
        var folder = "././.tmp/";
        var path = name + "-" + moment().format("MMM-DD-YYYY-hh-mm-ss-a") + ".xlsx";
        var finalPath = folder + path;
        fs.writeFile(finalPath, xls, 'binary', function (err) {
            if (err) {
                res.callback(err, null);
            } else {
                fs.readFile(finalPath, function (err, excel) {
                    if (err) {
                        res.callback(err, null);
                    } else {
                        res.set('Content-Type', "application/octet-stream");
                        res.set('Content-Disposition', "attachment;filename=" + path);
                        res.send(excel);
                        fs.unlink(finalPath);
                    }
                });
            }
        });

    },
    excelDateToDate: function isDate(value) {
        value = (value - (25567 + 1)) * 86400 * 1000;
        var mom = moment(value);
        if (mom.isValid()) {
            return mom.toDate();
        } else {
            return undefined;
        }
    },

    email: function (data, callback) {
        console.log("insode email api****", data),
            Password.find().exec(function (err, userdata) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else if (userdata && userdata.length > 0) {
                    if (data.filename && data.filename != "") {
                        console.log("Email data: ", data);
                        request.post({
                            url: requrl + "config/emailReader/",
                            json: data
                        }, function (err, http, body) {
                            console.log("body : ", body);
                            if (err) {
                                console.log(err);
                                callback(err, null);
                            } else {
                                if (body && body.value != false) {
                                    var helper = require('sendgrid').mail;

                                    from_email = new helper.Email(data.from);
                                    to_email = new helper.Email(data.email);
                                    subject = data.subject;
                                    // name = data.name;
                                    content = new helper.Content("text/html", body);
                                    mail = new helper.Mail(from_email, subject, to_email, content);
                                    if (data.file) {
                                        var attachment = new helper.Attachment();
                                        var file = fs.readFileSync('pdf/' + data.file);
                                        var base64File = new Buffer(file).toString('base64');
                                        attachment.setContent(base64File);
                                        attachment.setType('application/pdf');
                                        var pdfgen = data.filename.split(".");
                                        data.filename = pdfgen[0] + ".pdf";
                                        attachment.setFilename(data.filename);
                                        attachment.setDisposition('attachment');
                                        mail.addAttachment(attachment);

                                    }

                                    // console.log("api_key", userdata[0].name);
                                    var sg = require('sendgrid')(userdata[0].name);
                                    var request = sg.emptyRequest({
                                        method: 'POST',
                                        path: '/v3/mail/send',
                                        body: mail.toJSON()
                                    });
                                    // console.log("request", request.body.attachments);
                                    sg.API(request, function (error, response) {
                                        console.log("response", data);
                                        if (error) {
                                            console.log('Error response received', error);
                                            callback(error, null);
                                        } else {
                                            callback(null, data);
                                        }
                                    })
                                } else {
                                    callback({
                                        message: "Error while sending mail."
                                    }, null);
                                }
                            }
                        });
                    } else {
                        callback({
                            message: "Please provide params"
                        }, null);
                    }
                } else {
                    callback({
                        message: "No api keys found"
                    }, null);
                }
            });
    },

    generatePdf: function (page, callback) {
        var pdf = require('html-pdf');
        var obj = {};
        var env = {};
        console.log("page", page);
        obj.name = page;



        var file = "certificate";

        console.log(" **** inside generatePdf ******** & file is ", file);

        var i = 0;
        sails.hooks.views.render(file, obj, function (err, html) {
            console.log(html);
            if (err) {
                console.log("errr", err);
                callback(err);
            } else {
                console.log("else");
                var path = "pdf/";
                var newFilename = file + ".pdf";
                console.log(" **** inside sails.hooks.views.render ******** & newFilename is ", newFilename);
                var writestream = fs.createWriteStream(path + newFilename);
                writestream.on('finish', function (err, res) {
                    if (err) {
                        console.log("Something Fishy", err);
                    } else {
                        red("Finish is working");
                        console.log(res);
                        callback(null, {
                            name: newFilename,
                            url: newFilename
                        });
                    }
                });

                var options = {
                    "phantomPath": "node_modules/phantomjs/bin/phantomjs",
                    // Export options 
                    "directory": "/tmp",
                    "height": "14in", // allowed units: mm, cm, in, px
                    "width": "10in",
                    // "format": "Letter", // allowed units: A3, A4, A5, Legal, Letter, Tabloid 
                    // "orientation": "portrait", // portrait or landscape 
                    // "zoomFactor": "1", // default is 1 
                    // Page options 
                    "border": {
                        "top": "2cm", // default is 0, units: mm, cm, in, px 
                        "right": "1cm",
                        "bottom": "1cm",
                        "left": "1cm"
                    },
                    // File options 
                    "type": "pdf", // allowed file types: png, jpeg, pdf 
                    "timeout": 30000, // Timeout that will cancel phantomjs, in milliseconds 
                    "footer": {
                        "height": "2cm",
                    },
                    // "filename": page.filename + ".pdf"
                };

                pdf.create(html, options).toStream(function (err, stream) {
                    console.log(" ***** inside pdf.create ********");
                    if (err) {
                        callback(err);
                    } else {
                        green("IN PDF CREATE");
                        console.log("In Config To generate PDF");
                        i++;
                        stream.pipe(writestream);
                    }
                });
            }

        });
    },

    emailTo: function (data, callback) {
        Password.find().exec(function (err, userdata) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else if (userdata && userdata.length > 0) {
                if (data.filename && data.filename != "") {
                    //console.log("filename ", data.filename);
                    request.post({
                        url: requrl + "config/emailReader/",
                        json: data
                    }, function (err, http, body) {
                        console.log("body : ", body);
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else {
                            //console.log('email else');
                            if (body && body.value != false) {
                                var sg = require('sendgrid')(userdata[0].name);

                                var request = sg.emptyRequest({
                                    method: 'POST',
                                    path: '/v3/mail/send',
                                    body: {
                                        personalizations: [{
                                            to: data.email1,
                                            cc: data.cc1,
                                            bcc: data.bcc1,
                                            subject: data.subject
                                        }],
                                        from: {
                                            email: data.from
                                            // ,name: "Tagboss"
                                        },

                                        content: [{
                                            type: 'text/html',
                                            value: body,
                                        }],
                                    },
                                });

                                sg.API(request, function (error, response) {
                                    if (error) {
                                        callback(null, error);
                                        console.log('Error response received');
                                    } else {
                                        // console.log(response.statusCode)
                                        // console.log(response.body)
                                        // console.log(response.headers)
                                        callback(null, response);
                                    }
                                })
                            } else {
                                callback({
                                    message: "Error while sending mail."
                                }, null);
                            }
                        }
                    });
                } else {
                    callback({
                        message: "Please provide params"
                    }, null);
                }
            } else {
                callback({
                    message: "No api keys found"
                }, null);
            }
        });
    },

    downloadFromUrl: function (url, callback) {
        var dest = "./.tmp/" + moment().valueOf() + "-" + _.last(url.split("/"));
        var file = fs.createWriteStream(dest);
        var request = http.get(url, function (response) {
            response.pipe(file);
            file.on('finish', function () {
                Config.uploadFile(dest, callback);
            });
        }).on('error', function (err) {
            fs.unlink(dest);
            callback(err);
        });
    }

};
module.exports = _.assign(module.exports, exports, model);
