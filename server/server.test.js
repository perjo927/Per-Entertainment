var chai = require('chai');
var should = chai.should();
var sinon = require('sinon');
var request = require('supertest');

describe('As a developer I want to use Pers API so that I can serve data to my games', function () {

    describe('Given that I visit the Per Entertainment API', function () {
        var app = require('./main');

        describe('When I GET the home route', function () {
            it('Then it should give me a welcome message', function (done) {
                request(app)
                    .get('/')
                    // .expect('Content-Type', /json/)
                    // .expect('Content-Length', '4')
                    .set('Accept', 'application/json')
                    .expect(200, "Welcome to Per Entertainment!", done);
            });
        });

        describe('When I GET the game route with a correct ID', function () {
            it('Then it should send me json data', function (done) {
                request(app)
                    .get('/game/1')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });
        });

        describe('When I GET a new gameround with a correct game id', function () {
            it('Then it should send me json data', function (done) {
                request(app)
                    .get('/game/1/newround')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });
        });


        describe('When I GET a non-existing game', function () {
            it('Then I should get a 500 exception', function (done) {
                request(app)
                    .get('/game/2')
                    .set('Accept', 'application/json')
                    .expect(500, "500 Server Exception", done);
            });
        });

        describe('When I GET a non-existing route', function () {
            it('Then I should get a 404 exception', function (done) {
                request(app)
                    .get('/foo')
                    .expect(404, "404 Not Found Exception", done);
            });
        });
    });
});
