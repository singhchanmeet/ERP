@admin.action(description='Generate Report')
def generate_fees_report(self, request, queryset):
    all_students = []
    for student in queryset:
        all_students.append(student)
    return render(request, 'fees_erp/report-pdfs.html', {'all_students': all_students})