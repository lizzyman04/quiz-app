'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { offlineRequest } from './offline-client';
import * as svc from '../services';
import * as T from '../types';

export const useClasses = () => useQuery({ queryKey: ['classes'], queryFn: () => offlineRequest(() => svc.getClasses(), { cacheKey: 'classes' }) });
export const useCreateClass = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: T.CreateClassPayload) => offlineRequest(() => svc.createClass(p), { queueIfOffline: true, mutation: { endpoint: '/api/classes', method: 'POST', data: p } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['classes'] })
  });
};
export const useUpdateClass = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: T.CreateClassPayload }) => offlineRequest(() => svc.updateClass(id, data), { queueIfOffline: true, mutation: { endpoint: `/api/classes/${id}`, method: 'PUT', data } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['classes'] })
  });
};
export const useDeleteClass = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => offlineRequest(() => svc.deleteClass(id), { queueIfOffline: true, mutation: { endpoint: `/api/classes/${id}`, method: 'DELETE', data: null } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['classes'] })
  });
};

export const useStudents = () => useQuery({ queryKey: ['students'], queryFn: () => offlineRequest(() => svc.getStudents(), { cacheKey: 'students' }) });
export const useStudentsByClass = (cid: number) => useQuery({ queryKey: ['students', 'class', cid], queryFn: () => svc.getStudentsByClass(cid) });

export const useSubjects = () => useQuery({ queryKey: ['subjects'], queryFn: () => offlineRequest(() => svc.getSubjects(), { cacheKey: 'subjects' }) });
export const useCreateSubject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: T.CreateSubjectPayload) => offlineRequest(() => svc.createSubject(p), { queueIfOffline: true, mutation: { endpoint: '/api/subjects', method: 'POST', data: p } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['subjects'] })
  });
};
export const useUpdateSubject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: T.CreateSubjectPayload }) => offlineRequest(() => svc.updateSubject(id, data), { queueIfOffline: true, mutation: { endpoint: `/api/subjects/${id}`, method: 'PUT', data } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['subjects'] })
  });
};
export const useDeleteSubject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => offlineRequest(() => svc.deleteSubject(id), { queueIfOffline: true, mutation: { endpoint: `/api/subjects/${id}`, method: 'DELETE', data: null } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['subjects'] })
  });
};

export const useSessions = () => useQuery({ queryKey: ['sessions'], queryFn: () => offlineRequest(() => svc.getSessions(), { cacheKey: 'sessions' }) });
export const useCreateSession = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: T.CreateSessionPayload) => offlineRequest(() => svc.createSession(p), { queueIfOffline: true, mutation: { endpoint: '/api/sessions', method: 'POST', data: p } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sessions'] })
  });
};

export const useTeachers = () => useQuery({ queryKey: ['teachers'], queryFn: () => svc.getTeachers() });
export const useSessionQuestions = (sid: number) => useQuery({ queryKey: ['questions', sid], queryFn: () => svc.getSessionQuestions(sid) });
export const useSessionScores = (sid: number) => useQuery({ queryKey: ['scores', sid], queryFn: () => svc.getSessionScores(sid) });
export const useSyncScores = () => useMutation({ mutationFn: (p: T.ScoreSyncPayload[]) => svc.syncScores(p) });
