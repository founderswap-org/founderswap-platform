import { Button } from '@founderswap/design-system/components/ui/button';
import { type ReactNode, useEffect, useRef, useState } from 'react';

export interface EnsurePermissionsProps {
  children?: ReactNode;
}

type PermissionState = 'denied' | 'granted' | 'prompt' | 'unable-to-determine';

async function getExistingPermissionState(): Promise<PermissionState> {
  try {
    const query = await navigator.permissions.query({
      name: 'microphone' as any,
    });
    return query.state;
  } catch (error) {
    return 'unable-to-determine';
  }
}

export function EnsurePermissions(props: EnsurePermissionsProps) {
  const [permissionState, setPermissionState] =
    useState<PermissionState | null>(null);

  const mountedRef = useRef(true);

  useEffect(() => {
    getExistingPermissionState().then((result) => {
      if (mountedRef.current) setPermissionState(result);
    });
    return () => {
      mountedRef.current = false;
    };
  }, []);

  if (permissionState === null) return null;

  if (permissionState === 'denied') {
    return (
      <div className="grid h-full items-center">
        <div className="mx-auto max-w-80 space-y-2">
          <h1 className="font-bold text-2xl">Permission denied</h1>
          <p>
            You will need to go into your browser settings and manually
            re-enable permission.
          </p>
        </div>
      </div>
    );
  }

  if (permissionState === 'prompt') {
    return (
      <div className="grid h-full items-center">
        <div className="mx-auto max-w-80">
          <p className="mb-8">
            In order to use Orange Meets, you will need to grant permission to
            your camera and microphone. You will be prompted for access.
          </p>
          <Button
            onClick={() => {
              navigator.mediaDevices
                .getUserMedia({
                  video: true,
                  audio: true,
                })
                .then((ms) => {
                  if (mountedRef.current) setPermissionState('granted');
                  ms.getTracks().forEach((t) => t.stop());
                })
                .catch(() => {
                  if (mountedRef.current) setPermissionState('denied');
                });
            }}
          >
            Allow access
          </Button>
        </div>
      </div>
    );
  }

  return props.children;
}
