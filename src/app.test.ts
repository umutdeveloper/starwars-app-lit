import { $, expect } from '@wdio/globals';
import { Router } from '@vaadin/router';
import { Routes } from './utils/routes';
import routes from './app.routes';

import './app';

describe('App component routing', () => {
  let router: Router;
  let elem: HTMLElement;

  beforeEach(() => {
    elem = document.createElement('app-root');
  });

  afterEach(() => {
    elem?.remove();
  });

  const renderByRoute = async (path: string) => {
    document.body.appendChild(elem);
    router = new Router(elem);
    await router.setRoutes(routes);
    await router.render(path);
    await router.ready;
  };

  it('should render the People page by /', async () => {
    await renderByRoute('/');
    const text = await $('app-people').getText();
    expect(text).toHaveText('People List');
  });

  it('should render the People page by /people', async () => {
    await renderByRoute(Routes.People);
    const text = await $('app-people').getText();
    expect(text).toHaveText('People List');
  });

  it('should render the Films page by /films', async () => {
    await renderByRoute(Routes.Films);
    const text = await $('app-films').getText();
    expect(text).toHaveText('Films List');
  });

  it('should render the Planets page by /planets', async () => {
    await renderByRoute(Routes.Planets);
    const text = await $('app-planets').getText();
    expect(text).toHaveText('Planets List');
  });

  it('should render the Species page by /species', async () => {
    await renderByRoute(Routes.Species);
    const text = await $('app-species').getText();
    expect(text).toHaveText('Species List');
  });

  it('should render the Starships page by /starships', async () => {
    await renderByRoute(Routes.Starships);
    const text = await $('app-starships').getText();
    expect(text).toHaveText('Starships List');
  });

  it('should render the Vehicles page by /vehicles', async () => {
    await renderByRoute(Routes.Vehicles);
    const text = await $('app-vehicles').getText();
    expect(text).toHaveText('Vehicles List');
  });
});
