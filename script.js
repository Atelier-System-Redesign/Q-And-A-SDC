/* eslint-disable func-names */
/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {

  stages: [
    { duration: '10s', target: 100 },
    { duration: '15s', target: 100 },
    { duration: '5s', target: 0 },
  ],
};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function () {
  const random = Math.floor(Math.random() * 4000) + 1;
  const res = http.get(`http://localhost:3000/qa/questions?product_id=${random}`);
  // const res = http.get(`http://localhost:3000/qa/questions/${random}/answers`);
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
