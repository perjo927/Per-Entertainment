const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');
const request = require('supertest');

describe('As a developer I want to use Pers API so that I can serve data to my games', () => {

    describe('Given that I visit the Per Entertainment API', () => {
        const app = require('./main');

        describe('When I GET the home route', () => {
            it('Then it should give me a welcome message', (done) => {
                request(app)
                    .get('/')
                    .expect(200, "Welcome to Per Entertainment!", done);
            });
        });

        describe('When I GET the game route with a correct ID', () => {
            it('Then it should send me json data', (done) => {
                request(app)
                    .get('/game/1')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });
        });

        describe('When I GET a new gameround with a correct game id', () => {
            it('Then it should send me json data', (done) => {
                request(app)
                    .get('/game/1/newround')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });
        });


        describe('When I GET a non-existing game', () => {
            it('Then I should get a 500 exception', (done) => {
                request(app)
                    .get('/game/2')
                    .set('Accept', 'application/json')
                    .expect(500, "500 Server Exception", done);
            });
        });

        describe('When I GET a non-existing route', () => {
            it('Then I should get a 404 exception', (done) => {
                request(app)
                    .get('/foo')
                    .expect(404, "404 Not Found Exception", done);
            });
        });
    });
});
