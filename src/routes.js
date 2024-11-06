import Diagram from './components/Diagram.js';

const routes = [
  {
    key: 0,
    path: '/',
    elements: [
      <p key={0}>Main Page</p>
    ]
  },
  {
    key: 1,
    path: '/resources/:resourceId/structure',
    elements: [
      <Diagram key={0}/>
    ]
  }
];

export default routes;