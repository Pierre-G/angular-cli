/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Architect } from '@angular-devkit/architect/src/index2';
import { join, normalize } from '@angular-devkit/core';
import { BrowserBuilderOutput } from '../../src/browser/index2';
import { browserBuild, createArchitect, host } from '../utils';


describe('Browser Builder profile', () => {
  const target = { project: 'app', target: 'build' };
  let architect: Architect;

  beforeEach(async () => {
    await host.initialize().toPromise();
    architect = (await createArchitect(host.root())).architect;
  });
  afterEach(async () => host.restore().toPromise());

  it('works', async () => {
    const run = await architect.scheduleTarget(target, { profile: true });
    const output = await run.result as BrowserBuilderOutput;

    expect(output.success).toBe(true);
    expect(host.scopedSync().exists(normalize('chrome-profiler-events.json'))).toBe(true);
    expect(host.scopedSync().exists(normalize('speed-measure-plugin.json'))).toBe(true);

    await run.stop();
  });
});
