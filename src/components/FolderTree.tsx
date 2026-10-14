import { useState } from 'react';
import { ChevronRight, Folder, File, FolderOpen } from 'lucide-react';

interface TreeNode {
  name: string;
  type: 'file' | 'folder';
  comment?: string;
  children?: TreeNode[];
}

const treeData: TreeNode[] = [
  {
    name: 'ledgerly/',
    type: 'folder',
    children: [
      {
        name: 'src/',
        type: 'folder',
        children: [
          {
            name: 'app/',
            type: 'folder',
            comment: 'Routing surface only',
            children: [
              {
                name: '(marketing)/',
                type: 'folder',
                comment: 'Public site; group omitted from URL',
                children: [
                  { name: 'page.tsx', type: 'file' }
                ]
              },
              {
                name: '(dashboard)/',
                type: 'folder',
                comment: 'Authenticated app; shared layout',
                children: [
                  { name: 'layout.tsx', type: 'file' },
                  {
                    name: 'invoices/',
                    type: 'folder',
                    children: [
                      { name: 'page.tsx', type: 'file', comment: '/invoices' },
                      {
                        name: '[invoiceId]/',
                        type: 'folder',
                        children: [
                          { name: 'page.tsx', type: 'file', comment: '/invoices/:invoiceId' }
                        ]
                      },
                      { name: '_components/', type: 'folder', comment: 'Route-private UI' },
                      { name: '_actions/', type: 'folder', comment: 'Route-private Server Actions' },
                    ]
                  },
                  {
                    name: 'settings/',
                    type: 'folder',
                    children: [
                      { name: 'page.tsx', type: 'file' }
                    ]
                  }
                ]
              },
              {
                name: 'api/',
                type: 'folder',
                children: [
                  {
                    name: 'webhooks/',
                    type: 'folder',
                    children: [
                      {
                        name: 'stripe/',
                        type: 'folder',
                        children: [
                          { name: 'route.ts', type: 'file', comment: 'Machine-to-machine endpoint' }
                        ]
                      }
                    ]
                  }
                ]
              },
              { name: 'layout.tsx', type: 'file', comment: 'Root layout' }
            ]
          },
          {
            name: 'features/',
            type: 'folder',
            comment: 'Domain logic, colocated by change boundary',
            children: [
              {
                name: 'invoices/',
                type: 'folder',
                children: [
                  { name: 'actions.ts', type: 'file' },
                  { name: 'queries.ts', type: 'file' },
                  { name: 'schemas.ts', type: 'file' },
                  { name: 'types.ts', type: 'file' },
                ]
              },
              {
                name: 'billing/',
                type: 'folder',
                children: [
                  { name: 'webhooks.ts', type: 'file' },
                  { name: 'payments.ts', type: 'file' },
                ]
              },
              {
                name: 'organizations/',
                type: 'folder',
                children: [
                  { name: 'queries.ts', type: 'file' },
                ]
              }
            ]
          },
          {
            name: 'shared/',
            type: 'folder',
            comment: 'Cross-feature technical concerns',
            children: [
              {
                name: 'supabase/',
                type: 'folder',
                children: [
                  { name: 'client.ts', type: 'file' },
                  { name: 'server.ts', type: 'file' },
                  { name: 'proxy.ts', type: 'file' },
                ]
              },
              {
                name: 'auth/',
                type: 'folder',
                children: [
                  { name: 'require-role.ts', type: 'file' },
                ]
              },
              { name: 'ui/', type: 'folder' },
            ]
          },
          {
            name: 'testing/',
            type: 'folder',
            children: [
              { name: 'factories/', type: 'folder' },
            ]
          }
        ]
      },
      {
        name: 'supabase/',
        type: 'folder',
        children: [
          { name: 'migrations/', type: 'folder', comment: 'Ordered SQL migrations' },
          { name: 'seed.sql', type: 'file', comment: 'Deterministic seed' },
          { name: 'tests/', type: 'folder', comment: 'RLS pgTAP tests' },
          { name: 'config.toml', type: 'file' },
        ]
      },
      {
        name: 'scripts/',
        type: 'folder',
        children: [
          { name: 'seed.ts', type: 'file', comment: 'Optional TypeScript seeding' },
        ]
      },
      {
        name: '.github/',
        type: 'folder',
        children: [
          {
            name: 'workflows/',
            type: 'folder',
            children: [
              { name: 'ci.yml', type: 'file' },
            ]
          }
        ]
      },
      { name: 'next.config.ts', type: 'file' },
      { name: 'package.json', type: 'file' },
      { name: 'tsconfig.json', type: 'file' },
    ]
  }
];

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const Icon = node.type === 'folder' ? (isOpen ? FolderOpen : Folder) : File;
  const iconColor = node.type === 'folder' ? 'text-primary-400' : 'text-surface-400';

  return (
    <div>
      <div
        className="flex items-center gap-1.5 py-0.5 px-2 rounded hover:bg-surface-100 cursor-pointer group"
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => node.type === 'folder' && setIsOpen(!isOpen)}
      >
        {node.type === 'folder' && (
          <ChevronRight
            size={12}
            className={`text-surface-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
          />
        )}
        {node.type !== 'folder' && <span className="w-3" />}
        <Icon size={14} className={iconColor} />
        <span className={`text-sm ${node.type === 'folder' ? 'font-medium text-surface-800' : 'text-surface-600'}`}>
          {node.name}
        </span>
        {node.comment && (
          <span className="text-xs text-surface-400 ml-2 hidden sm:inline">
            # {node.comment}
          </span>
        )}
      </div>
      {node.type === 'folder' && isOpen && node.children && (
        <div>
          {node.children.map((child, i) => (
            <TreeItem key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FolderTree() {
  return (
    <div className="rounded-xl border border-surface-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-surface-100">
        <Folder size={16} className="text-primary-500" />
        <span className="text-sm font-semibold text-surface-700">Project Structure</span>
      </div>
      <div className="folder-tree">
        {treeData.map((node, i) => (
          <TreeItem key={i} node={node} />
        ))}
      </div>
    </div>
  );
}
