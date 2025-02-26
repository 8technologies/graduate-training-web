    import { CountChart } from '../../../../components/charts';
    import Announcements from '../../../../components/charts/Announcements';
    import AttendanceChart from '../../../../components/charts/AttendanceChart';
    import EventCalendar from '../../../../components/charts/EventCalendar';
    import { ChannelStats, EarningsChart, EntryCallout, Highlights, TeamMeeting, Teams } from './blocks';
    const Demo1LightSidebarContent = () => {
      return <div className="grid gap-5 lg:gap-7.5">
          <div className="grid lg:grid-cols-3 gap-y-5 lg:gap-7.5 items-stretch">
            <div className="lg:col-span-1">
              <div className="grid grid-cols-2 gap-5 lg:gap-7.5 h-full items-stretch">
                <ChannelStats />
              </div>
            </div>

            <div className="lg:col-span-2">
              < CountChart />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
            <div className="lg:col-span-1">
              <Highlights limit={3} />
            </div>

            <div className="lg:col-span-2">
              <Announcements />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
            <div className="lg:col-span-1">
              <AttendanceChart />
            </div>

            <div className="lg:col-span-2">
            <EventCalendar />
            </div>
          </div>
        </div>;
    };
    export { Demo1LightSidebarContent };