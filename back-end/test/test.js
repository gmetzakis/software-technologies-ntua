let server = require("../server.js");
let chai = require("chai");
let chaiHttp = require("chai-http");

// Assertion
chai.should();
chai.use(chaiHttp);
const url = '/evcharge/api';

const task = {
    username: "admin",
    password: "petrol4ever"
};
let valid_token = '';





describe('Task APIs', () => {
    describe("Test POST route /login", () => {
        it("It return 400 Error if credentials are missing", (done) => {
            const task = {
                username: "foo"
            };
            chai.request(server.app)
                .post(url+"/login")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    //response.body.should.be.a('array');
                    //response.body.length.should.not.be.eq(0);
                done();
                });
        });

        it("It return 404 Error if credentials are wrong", (done) => {
            const task = {
                username: "foo",
                password: "foo",
            };
            chai.request(server.app)
                .post(url+"/login")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(404);
                    //response.body.should.be.a('array');
                    //response.body.length.should.not.be.eq(0);
                done();
                });
        });

        it("It return a token upon success", (done) => {
            const task = {
                username: "admin",
                password: "petrol4ever"
            };
            var valid_token;
            chai.request(server.app)
                .post(url+"/login")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.token.should.be.a('string');
                    valid_token = response.body.token;
                    //response.body.length.should.not.be.eq(0);
                done();
                });
        });
    })

    describe("Test POST route /logout", () => {
        it("It return 401 Error if token is not valid", (done) => {
            chai.request(server.app)
                .post(url+"/logout")
                .set('x-observatory-auth','something')
                .end((err, response) => {
                    response.should.have.status(401);
                    //response.body.should.be.a('array');
                    //response.body.length.should.not.be.eq(0);
                done();
                });
        });
        it("It return 401 Error if no token is provided", (done) => {
            chai.request(server.app)
                .post(url+"/logout")
                .end((err, response) => {
                    response.should.have.status(401);
                    //response.body.should.be.a('array');
                    //response.body.length.should.not.be.eq(0);
                done();
                });
        });
        it("It return a token upon success", (done) => {
            const task = {
                username: "admin",
                password: "petrol4ever"
            };
            var valid_token;
            chai.request(server.app)
                .post(url+"/login")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.token.should.be.a('string');
                    valid_token = response.body.token;
                    chai.request(server.app)
                        .post(url+"/logout")
                        .set("x-observatory-auth",valid_token)
                        .end((err2, res) =>{
                            res.should.have.status(200);

                        })
                    //response.body.length.should.not.be.eq(0);
                done();
              });
        });
      })
    });

    describe("Test POST route /SessionsPerPoint/:pointID/:date_from/:date_to", () => {

        describe("Test input", () => {
          /*
            it("It return 400 Error if parameters are missing", (done) => {
                chai.request(server.app)
                    .get(url+"/SessionsPerPoint/5/20200310//")
                    .end((err, response) => {
                        response.should.have.status(400);
                    done();
                    });
            });*/
            it("It return 400 Error if parameters are not valid", (done) => {
                chai.request(server.app)
                    .get(url+"/SessionsPerPoint/5/20200310/20201325")
                    .end((err, response) => {
                        response.should.have.status(400);
                    done();
                    });
            });
            it("It return 400 Error if parameters are in wrong format", (done) => {
                chai.request(server.app)
                    .get(url+"/SessionsPerPoint/5/2020310/20201325")
                    .end((err, response) => {
                        response.should.have.status(400);
                    done();
                    });
            });
        })


        it("It return 401 Error if user not authenticated (no token provided)", (done) => {
            chai.request(server.app)
                .get(url+"/SessionsPerPoint/5/20200310/20200313")
                .end((err, response) => {
                    response.should.have.status(401);
                done();
                });
        });

        it("It return 401 Error if token is not valid", (done) => {
            chai.request(server.app)
                .get(url+"/SessionsPerPoint/5/20200310/20200313")
                .set('x-observatory-auth','something')
                .end((err, response) => {
                    response.should.have.status(401);
                done();
                });
        });

        it("It return 402 Error if there is no data for these parameters ", (done) => {
            const task = {
                username: "admin",
                password: "petrol4ever"
            };
            var valid_token;
            chai.request(server.app)
                .post(url+"/login")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.token.should.be.a('string');
                    valid_token = response.body.token;
                    chai.request(server.app)
                        .get(url+"/SessionsPerPoint/5/10200310/10200313")
                        .set("x-observatory-auth",valid_token)
                        .end((err2, res) =>{
                            res.should.have.status(402);

                        })
                done();
              });
        });
      });

        it("It return data successfully ", (done) => {
            const task = {
                username: "admin",
                password: "petrol4ever"
            };
            var valid_token;
            chai.request(server.app)
                .post(url+"/login")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.token.should.be.a('string');
                    valid_token = response.body.token;
                    chai.request(server.app)
                        .get(url+"/SessionsPerPoint/15/20190110/20191210")
                        .set("x-observatory-auth",valid_token)
                        .end((err2, res) =>{
                            res.should.have.status(200);

                        })
                done();
              });
        });



    describe("Test POST route /SessionsPerProvider/:providerID/:date_from/:date_to", () => {

        describe("Test input", () => {
          /*
            it("It return 400 Error if parameters are missing", (done) => {
                chai.request(server.app)
                    .post(url+"/SessionsPerProvider/5/20200310")
                    .end((err, response) => {
                        response.should.have.status(400);
                    done();
                    });
            });*/
            it("It return 400 Error if parameters are not valid", (done) => {
                chai.request(server.app)
                    .get(url+"/SessionsPerProvider/5/20200310/20201325")
                    .end((err, response) => {
                        response.should.have.status(400);
                    done();
                    });
            });
            it("It return 400 Error if parameters are in wrong format", (done) => {
                chai.request(server.app)
                    .get(url+"/SessionsPerProvider/5/2020310/20201325")
                    .end((err, response) => {
                        response.should.have.status(400);
                    done();
                    });
            });
        })

        it("It return 401 Error if user not authenticated (no token provided)", (done) => {
            chai.request(server.app)
                .get(url+"/SessionsPerProvider/5/20200310/20200313")
                .end((err, response) => {
                    response.should.have.status(401);
                done();
                });
        });

        it("It return 401 Error if token is not valid", (done) => {
            chai.request(server.app)
                .get(url+"/SessionsPerProvider/5/20200310/20200313")
                .set('x-observatory-auth','something')
                .end((err, response) => {
                    response.should.have.status(401);
                done();
                });
        });
/*
        it("It return 403 Error if there is no data for these parameters ", (done) => {
            const task = {
                username: "admin",
                password: "petrol4ever"
            };
            var valid_token;
            chai.request(server.app)
                .get(url+"/login")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.token.should.be.a('string');
                    valid_token = response.body.token;
                    chai.request(server.app)
                        .get(url+"/SessionsPerProvider/5/10200310/10200313")
                        .set("x-observatory-auth",valid_token)
                        .end((err2, res) =>{
                            res.should.have.status(403);

                        })
                done();
              });
        });*/

        it("It return data successfully ", (done) => {
            const task = {
                username: "admin",
                password: "petrol4ever"
            };
            var valid_token;
            chai.request(server.app)
                .post(url+"/login")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.token.should.be.a('string');
                    valid_token = response.body.token;
                    chai.request(server.app)
                        .get(url+"/SessionsPerProvider/5/20190110/20191213")
                        .set("x-observatory-auth",valid_token)
                        .end((err2, res) =>{
                            res.should.have.status(200);

                        })
                done();
              });
        });

    })



    describe("Test POST route /SessionsPerEV/:vehicleID/:date_from/:date_to", () => {

        describe("Test input", () => {
          /*
            it("It return 400 Error if parameters are missing", (done) => {
                chai.request(server.app)
                    .post(url+"/SessionsPerEV/5/20200310")
                    .end((err, response) => {
                        response.should.have.status(400);
                    done();
                    });
            });*/
            it("It return 400 Error if parameters are not valid", (done) => {
                chai.request(server.app)
                    .get(url+"/SessionsPerEV/5/20200310/20201325")
                    .end((err, response) => {
                        response.should.have.status(400);
                    done();
                    });
            });
            it("It return 400 Error if parameters are in wrong format", (done) => {
                chai.request(server.app)
                    .get(url+"/SessionsPerEV/5/2020310/20201325")
                    .end((err, response) => {
                        response.should.have.status(400);
                    done();
                    });
            });
        })

        it("It return 401 Error if user not authenticated (no token provided)", (done) => {
            chai.request(server.app)
                .get(url+"/SessionsPerEV/5/20200310/20200313")
                .end((err, response) => {
                    response.should.have.status(401);
                done();
                });
        });

        it("It return 401 Error if token is not valid", (done) => {
            chai.request(server.app)
                .get(url+"/SessionsPerEV/5/20200310/20200313")
                .set('x-observatory-auth','something')
                .end((err, response) => {
                    response.should.have.status(401);
                done();
                });
        });
/*
        it("It return 403 Error if there is no data for these parameters ", (done) => {
            const task = {
                username: "admin",
                password: "petrol4ever"
            };
            var valid_token;
            chai.request(server.app)
                .get(url+"/login")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.token.should.be.a('string');
                    valid_token = response.body.token;
                    chai.request(server.app)
                        .get(url+"/SessionsPerEV/5/10200310/10200313")
                        .set("x-observatory-auth",valid_token)
                        .end((err2, res) =>{
                            res.should.have.status(403);

                        })
                done();
              });
        });*/

        it("It return data successfully ", (done) => {
            const task = {
                username: "admin",
                password: "petrol4ever"
            };
            var valid_token;
            chai.request(server.app)
                .post(url+"/login")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.token.should.be.a('string');
                    valid_token = response.body.token;
                    chai.request(server.app)
                        .get(url+"/SessionsPerEV/5/20200110/20201213")
                        .set("x-observatory-auth",valid_token)
                        .end((err2, res) =>{
                            res.should.have.status(200);

                        })
                done();
              });
        });

    })


    describe("Test GET route /SessionsPerStation/:stationID/:date_from/:date_to", () => {

        describe("Test input", () => {
          /*
            it("It return 400 Error if parameters are missing", (done) => {
                chai.request(server.app)
                    .get(url+"/SessionsPerStation/5/20200310")
                    .end((err, response) => {
                        response.should.have.status(400);
                    done();
                    });
            });*/
            it("It return 400 Error if parameters are not valid", (done) => {
                chai.request(server.app)
                    .get(url+"/SessionsPerStation/5/20200310/20201325")
                    .end((err, response) => {
                        response.should.have.status(400);
                    done();
                    });
            });
            it("It return 400 Error if parameters are in wrong format", (done) => {
                chai.request(server.app)
                    .get(url+"/SessionsPerStation/5/2020310/20201325")
                    .end((err, response) => {
                        response.should.have.status(400);
                    done();
                    });
            });
        })

        it("It return 401 Error if user not authenticated (no token provided)", (done) => {
            chai.request(server.app)
                .get(url+"/SessionsPerStation/5/20200310/20200313")
                .end((err, response) => {
                    response.should.have.status(401);
                done();
                });
        });

        it("It return 401 Error if token is not valid", (done) => {
            chai.request(server.app)
                .get(url+"/SessionsPerStation/5/20200310/20200313")
                .set('x-observatory-auth','something')
                .end((err, response) => {
                    response.should.have.status(401);
                done();
                });
        });

        it("It return 402 Error if there is no data for these parameters ", (done) => {
            const task = {
                username: "admin",
                password: "petrol4ever"
            };
            var valid_token;
            chai.request(server.app)
                .post(url+"/login")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.token.should.be.a('string');
                    valid_token = response.body.token;
                    chai.request(server.app)
                        .get(url+"/SessionsPerStation/5/10200310/10200313")
                        .set("x-observatory-auth",valid_token)
                        .end((err2, res) =>{
                            res.should.have.status(402);

                        })
                done();
              });
        });

        it("It return data successfully ", (done) => {
            const task = {
                username: "admin",
                password: "petrol4ever"
            };
            var valid_token;
            chai.request(server.app)
                .post(url+"/login")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.token.should.be.a('string');
                    valid_token = response.body.token;
                    chai.request(server.app)
                        .get(url+"/SessionsPerStation/5/20190110/20191213")
                        .set("x-observatory-auth",valid_token)
                        .end((err2, res) =>{
                            res.should.have.status(200);

                        })
                done();
              });
        });

    });
