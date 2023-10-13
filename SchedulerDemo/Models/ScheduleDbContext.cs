using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SchedulerDemo.Models;

public partial class ScheduleDbContext : DbContext
{
    public ScheduleDbContext()
    {
    }

    public ScheduleDbContext(DbContextOptions<ScheduleDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Userform> Userforms { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer(secret.optbuild);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Userform>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__userform__3213E83FE2602168");

            entity.ToTable("userform");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.City)
                .HasMaxLength(255)
                .HasColumnName("city");
            entity.Property(e => e.Date)
                .HasColumnType("date")
                .HasColumnName("date");
            entity.Property(e => e.Description)
                .HasMaxLength(3000)
                .HasColumnName("description");
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .HasColumnName("firstName");
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .HasColumnName("lastName");
            entity.Property(e => e.Public).HasColumnName("public");
            entity.Property(e => e.State)
                .HasMaxLength(3)
                .HasColumnName("state");
            entity.Property(e => e.Time).HasColumnName("time");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
