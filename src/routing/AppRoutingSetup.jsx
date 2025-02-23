import { Navigate, Route, Routes } from 'react-router';
import { DefaultPage, Demo1DarkSidebarPage, Demo2Page, Demo3Page, Demo4Page, Demo5Page } from '@/pages/dashboards';
import { SupervisorContent, ProfileActivityPage, ProfileBloggerPage, CampaignsCardPage, CampaignsListPage, ProjectColumn2Page, ProjectColumn3Page, ProfileCompanyPage, ProfileCreatorPage, ProfileCRMPage, ProfileDefaultPage, ProfileEmptyPage, ProfileFeedsPage, ProfileGamerPage, ProfileModalPage, ProfileNetworkPage, ProfileNFTPage, ProfilePlainPage, ProfileTeamsPage, ProfileWorksPage } from '@/pages/public-profile';
import { AccountActivityPage, AccountAllowedIPAddressesPage, AccountApiKeysPage, AccountAppearancePage, AccountBackupAndRecoveryPage, AccountBasicPage, AccountCompanyProfilePage, AccountCurrentSessionsPage, AccountDeviceManagementPage, AccountEnterprisePage, AccountGetStartedPage, AccountHistoryPage, AccountImportMembersPage, AccountIntegrationsPage, AccountInviteAFriendPage, AccountMembersStarterPage, AccountNotificationsPage, AccountOverviewPage, AccountPermissionsCheckPage, AccountPermissionsTogglePage, AccountPlansPage, AccountPrivacySettingsPage, AccountRolesPage, AccountSecurityGetStartedPage, AccountSecurityLogPage, AccountSettingsEnterprisePage, AccountSettingsModalPage, AccountSettingsPlainPage, AccountSettingsSidebarPage, AccountTeamInfoPage, AccountTeamMembersPage, AccountTeamsPage, AccountTeamsStarterPage, AccountUserProfilePage } from '@/pages/account';
import { NetworkAppRosterPage, NetworkMarketAuthorsPage, NetworkAuthorPage, NetworkGetStartedPage, NetworkMiniCardsPage, NetworkNFTPage, NetworkSocialPage, NetworkUserCardsTeamCrewPage, NetworkSaasUsersPage, NetworkStoreClientsPage, NetworkUserTableTeamCrewPage, NetworkVisitorsPage } from '@/pages/network';
import { AuthPage } from '@/auth';
import { RequireAuth } from '@/auth/RequireAuth';
import { Demo1Layout } from '@/layouts/demo1';
import { ErrorsRouting } from '@/errors';
import { AuthenticationWelcomeMessagePage, AuthenticationAccountDeactivatedPage, AuthenticationGetStartedPage } from '@/pages/authentication';

// Existing list pages
import SupervisorPageList from '@/pages/list/supervisors/SupervisorPageList';
import { StudentPageList, StudentProfile } from '../pages/list/students';
import { AlumniPageList } from '../pages/list/alumnis';
import { ProgramPageList } from '../pages/programs';
import { ScheduledTrainingPageList } from '../pages/scheduledtrainings';
import { EventsPageList } from '../pages/events';
import AnnoucementsPageList from '@/pages/announcements/AnnoucementsPageList';

// New dashboard imports (adjust the paths if using relative imports)
import { AdminDashboard } from '../pages/dashboards/admin';
import { AdminDashboardLayout } from '../pages/dashboards/admin';
import { AddStudentsForm }  from '../pages/list/forms';


const AppRoutingSetup = () => {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route element={<Demo1Layout />}>
          <Route path="/" element={<DefaultPage />} />
          <Route path="/dark-sidebar" element={<Demo1DarkSidebarPage />} /> 
          
          {/* List pages */}
          <Route path="/list/supervisors" element={<SupervisorPageList />} />
          <Route path="/list/students" element={<StudentPageList />} />
          <Route path="/list/alumnis" element={<AlumniPageList />} />
          <Route path="/programs" element={<ProgramPageList />} />
          <Route path="/trainings" element={<ScheduledTrainingPageList />} />
          <Route path="/events" element={<EventsPageList />} />
          <Route path="/announcements" element={<AnnoucementsPageList />} />

          {/* Forms */}
          <Route path="/students/add" element={<AddStudentsForm />} />


          {/* SingleProfilePages */}

          <Route path="/students/:id" element={<StudentProfile />} />
          
          {/* Public profiles and account routes ... */}
          <Route path="/supervisor/profiles" element={<SupervisorContent />} />
          {/* ... other existing routes ... */}

          {/* New Dashboard Routes */}
          <Route path="/admin/dashboard" element={
            <AdminDashboardLayout>
              <AdminDashboard />
            </AdminDashboardLayout>
          } />
         

          {/* Existing demo routes */}
          <Route path="/demo2" element={<Demo2Page />} />
          <Route path="/demo3" element={<Demo3Page />} />
          <Route path="/demo4" element={<Demo4Page />} />
          <Route path="/demo5" element={<Demo5Page />} />
          <Route path="/demo6" element={<Demo4Page />} />
          <Route path="/demo7" element={<Demo2Page />} />
          <Route path="/demo8" element={<Demo4Page />} />
          <Route path="/demo9" element={<Demo2Page />} />
          <Route path="/demo10" element={<Demo3Page />} />
        </Route>
      </Route>
      <Route path="error/*" element={<ErrorsRouting />} />
      <Route path="auth/*" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};

export { AppRoutingSetup };
