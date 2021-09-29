import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  defaultSearchParams,
  USER_ROLES_NAMES,
} from 'src/app/shared/common/constants';
import {
  generateMemberSubtitle,
  sortByIndex,
} from 'src/app/shared/common/functions';
import { MembershipStatusOptions, User } from 'src/app/shared/common/models';
import { uiroutes } from 'src/app/shared/common/ui-routes';
import { VerifyAccountAction } from 'src/app/shared/state/auth/auth.actions';
import { AuthStateModel } from 'src/app/shared/state/auth/auth.model';
import { AuthState } from 'src/app/shared/state/auth/auth.state';
import {
  FetchNextMembersAction,
  FetchPublicMembersAction,
} from 'src/app/shared/state/members/member.actions';
import { MemberState } from 'src/app/shared/state/members/member.state';
import { ShowNotificationAction } from 'src/app/shared/state/notifications/notification.actions';
import { LoginModalComponent } from '../../modals/login/login-modal.component';

// const tempUsers = [
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
// ];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  url: string;
  currentYear = new Date().getFullYear();
  privacyRoute = uiroutes.PRIVACY_ROUTE.route;
  @Select(AuthState.getIsLoggedIn)
  isLoggedIn$: Observable<boolean>;
  @Select(AuthState.getCurrentMemberStatus)
  membershipStatus$: Observable<string>;
  @Select(AuthState.getFirstTimeSetup)
  firstTimeSetup$: Observable<boolean>;
  membershipStatus: string;
  authState: AuthStateModel;
  pendingApproval: boolean = false;
  suspended: boolean = false;
  showAnnouncements: boolean = true;
  isLoggedIn: boolean = false;
  firstTimeSetup: boolean = false;
  showUnverifiedNotification: boolean = false;
  @Select(MemberState.listMembers)
  learners$: Observable<User[]>;
  @Select(MemberState.isFetching)
  isFetching$: Observable<boolean>;
  learners: any[] = [];
  isFetching: boolean = false;
  columnFilters = {
    roles: [
      USER_ROLES_NAMES.LEARNER,
      USER_ROLES_NAMES.CLASS_ADMIN_LEARNER,
      USER_ROLES_NAMES.INSTITUTION_ADMIN,
    ],
    membershipStatusIs: [MembershipStatusOptions.APPROVED],
  };
  constructor(
    private store: Store,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.fetchMembers();
    this.learners$.subscribe((val) => {
      this.learners = sortByIndex(val, 'score', 'DESC');
      // this.learners = tempUsers;
    });
    this.isFetching$.subscribe((val) => {
      this.isFetching = val;
    });
    this.isLoggedIn$.subscribe((val) => {
      this.isLoggedIn = val;
    });
    this.membershipStatus$.subscribe((val) => {
      if (this.membershipStatus != val && val !== undefined) {
        this.membershipStatus = val;
        this.processMembershipStatusOptions();
      }
    });

    this.firstTimeSetup$.subscribe((val) => {
      this.firstTimeSetup = val;
      if (this.firstTimeSetup) {
        // If this is the first time user is logging in, redirect to member form page
        // to update their profile info.
        this.router.navigate([uiroutes.MEMBER_FORM_ROUTE.route]);
      }
    });

    // this.pendingApproval =
    //   this.authState.membershipStatus == MembershipStatusOptions.PENDING_APPROVAL;
    // this.suspended =
    //   this.authState.membershipStatus == MembershipStatusOptions.SUSPENDED;
  }

  generateSubtitle(user) {
    return generateMemberSubtitle(user);
  }

  fetchMembers() {
    this.store.dispatch(
      new FetchPublicMembersAction({
        searchParams: {
          ...defaultSearchParams,
          columnFilters: this.columnFilters,
        },
      })
    );
  }

  onScroll() {
    this.store.dispatch(new FetchNextMembersAction());
  }

  processMembershipStatusOptions() {
    if (this.membershipStatus == MembershipStatusOptions.PENDING) {
      this.store.dispatch(
        new ShowNotificationAction({
          message:
            "Your account is pending approval by your institution's moderators. Please wait for them to approve you.",
          action: 'show',
          autoClose: false,
          id: 'pendinig-approval',
        })
      );
    }
  }

  closeAnnouncements() {
    this.showAnnouncements = false;
  }

  activateAccount() {
    this.url = window.location.href;

    if (this.url.includes(uiroutes.ACTIVATE_ACCOUNT_ROUTE.route)) {
      const token = this.url.split(
        uiroutes.ACTIVATE_ACCOUNT_ROUTE.route + '/'
      )[1];
      if (token) {
        this.store.dispatch(new VerifyAccountAction({ token }));
      }
    }
    if (this.url.includes(uiroutes.REGISTER_ROUTE.route)) {
      this.dialog.open(LoginModalComponent);
    }
  }

  onClickCard(learner) {
    this.router.navigate([
      `${uiroutes.MEMBER_PROFILE_ROUTE.route}/${learner.username}`,
    ]);
  }

  ngOnInit(): void {
    this.activateAccount();
  }
}
