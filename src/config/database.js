module.exports = {
  dialect: 'postgres',
  username: 'docker',
  password: 'docker',
  database: 'bootcamp_challenge_2',
  host: '127.0.0.1',
  operatorAlias: false,
  define: {
    timestamps: true,
    undescored: true,
    undescoredAll: true
  }
}
