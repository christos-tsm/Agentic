<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $roles = ['admin', 'employee', 'secretary'];

        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }

        $permissions = [
            'view_clients',
            'create_clients',
            'edit_clients',
            'delete_clients',
            'view_projects',
            'create_projects',
            'edit_projects',
            'add_comment_to_projects',
            'change_project_status',
            'delete_projects',
            'view_invoices',
            'create_invoices',
            'edit_invoices',
            'delete_invoices',
            'invite_employees',
            'view_employees',
            'edit_employees',
            'delete_employees',
        ];

        $employeePermissions = [
            'view_projects',
            'add_comment_to_projects',
            'change_project_status'
        ];

        $secretaryPermissions = [
            'view_clients',
            'create_clients',
            'edit_clients',
            'delete_clients',
            'view_projects',
            'create_projects',
            'edit_projects',
            'delete_projects',
            'view_invoices',
            'create_invoices',
            'edit_invoices',
            'delete_invoices',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $adminRole = Role::where('name', 'admin')->first();
        $adminRole->givePermissionTo($permissions);

        $employeeRole = Role::where('name', 'employee')->first();
        $employeeRole->givePermissionTo($employeePermissions);

        $secretaryRole = Role::where('name', 'secretary')->first();
        $secretaryRole->givePermissionTo($secretaryPermissions);
    }
}
