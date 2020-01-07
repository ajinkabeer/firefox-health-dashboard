import React from 'react';
import Grid from '@material-ui/core/Grid';
import DashboardPage from '../utils/DashboardPage';
import Section from '../utils/Section';
import { PowerSummary } from './summary';
import { TimeDomain } from '../vendor/jx/domains';
import { COMBOS, PLATFORMS, TESTS } from './config';
import { selectFrom } from '../vendor/vectors';

export default class Power extends React.Component {
  render() {
    const timeDomain = new TimeDomain({ past: '2month', interval: 'day' });
    const suites = selectFrom(COMBOS)
      .groupBy('suiteLabel')
      .map(([v]) => ({ suiteId: v.suite, suiteLabel: v.suiteLabel })).toArray();
    const cpuTest = selectFrom(TESTS).where({ id: 'cpu' }).first();

    return (
      <DashboardPage
        title="Power Usage"
      >
        {suites.map(({ suiteId, suiteLabel }) => (
          <Section
            key={`section_${suiteId}`}
            title={`${suiteLabel} - ${cpuTest.label}`}
          >
            <Grid container spacing={2}>
              {PLATFORMS.map(({ id, label: platformLabel }) => (
                <Grid key={`power_${id}_${suiteId}`} item xs={6}>
                  <PowerSummary
                    key={`power_${id}_${suiteId}`}
                    platform={id}
                    suite={suiteId}
                    timeDomain={timeDomain}
                    title={platformLabel}
                    testId={cpuTest.id}
                  />
                </Grid>
              ))}
            </Grid>
          </Section>
        ))}
      </DashboardPage>
    );
  }
}
